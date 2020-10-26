import User from "../models/User";
import {Utils} from '../utils/Utils'
import { NodeMailer } from "../utils/NodeMailer";

export class UserController{
    static async signUp(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const verificationToken = Utils.generateVerificationToken();
        const data = {
            email: email, 
            password: password, 
            username: username, 
            verification_token: verificationToken, 
            verification_token_time: Date.now()+new Utils().MAX_TOKEN_TIME, 
            created_at: new Date(), 
            updated_at: new Date()
        }
        try{
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
        const email = req.body.email;
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
        const email = req.query.email;
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
}