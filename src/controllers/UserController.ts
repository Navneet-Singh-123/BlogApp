import User from "../models/User";
import {Utils} from '../utils/Utils'
import { NodeMailer } from "../utils/NodeMailer";
import * as Bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken'
import { getEnvironmentVariables } from "../environments/env";

export class UserController{


    static async signUp(req, res, next){
        const email = req.body.email;
        const username = req.body.username;
        const verificationToken = Utils.generateVerificationToken();
        const password = req.body.password

        try{

            const hash = await Utils.encryptPassword(password);

            const data = {
                email: email, 
                password: hash, 
                username: username, 
                verification_token: verificationToken, 
                verification_token_time: Date.now()+new Utils().MAX_TOKEN_TIME, 
                created_at: new Date(), 
                updated_at: new Date()
            }
            
            let user = await new User(data).save();
            res.send(user);

            // Send verification email
            // await NodeMailer.sendEmail({to: ['snavneet561@gmail.com'], subject: 'Email Verification', html: `<h1>${verificationToken}</h1>`})

        }catch(e){
            next(e);
        }
    } 
    


    static async verify(req, res, next){
        const verificationToken = req.body.verification_token;
        const email = req.user.email;
        try{
            const user = await User.findOneAndUpdate({
                email: email, 
                verification_token: verificationToken, 
                verification_token_time: {$gt: Date.now()}
            }, {verified: true}, {new: true})
            if(user){
                res.send(user)
            }
            else{
                throw new Error('Verification Token is Expired. Please Request for a new One');
            }
        }catch(e){
            next(e);
        }
    }


    static async resendVerificationEmail(req, res, next){
        const email = req.user.email;
        const verificationToken = Utils.generateVerificationToken()
        try{
            const user: any = await User.findOneAndUpdate({email: email}, {
                verification_token: verificationToken, 
                verification_token_time: Date.now()+new Utils().MAX_TOKEN_TIME
            })
            if(user){
                const mailer = await NodeMailer.sendEmail({to: [user.email], subject: 'Email Verification', 
                    html: `<h1>${verificationToken}</h1>`
                })
                res.json({
                    success: true
                })
            }
            else{
                throw  Error('User Does not Exist');
            }
        }catch(e){
            next(e);
        }
    }

    static async test(req, res, next){
        const email = req.query.email
        const password = req.query.password;
        User.findOne({email: email}).then((user: any)=>{
            Bcrypt.compare(password, user.password, (err, same)=>{
                res.send(same);
            })
        })
    }

    static async login(req, res, next){
        const password = req.query.password;
        const user = req.user;
        try{
            await Utils.comparePassword({plainPassword: password, encryptedPassword: user.password});
            const token = Jwt.sign({email: user.email, user_id: user._id}, getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});
            const data = {
                user: user, 
                token: token
            }
            res.json(data)
        }catch(e){
            next(e);
        }
    }

    static async updatePassword(req, res, next){
        const user_id = req.user.user_id;
        const password = req.body.password;
        const newPassword = req.body.new_password;
        try{
            User.findOne({_id: user_id}).then(async (user: any)=>{
                await Utils.comparePassword({plainPassword: password , encryptedPassword: user.password});
                const encryptedPassword = await Utils.encryptPassword(newPassword);
                const newUser = await User.findOneAndUpdate({_id: user._id}, {password: encryptedPassword}, {new: true});
                res.send(newUser);
            })
        }catch(e){
            next(e);    
        }
    }
}