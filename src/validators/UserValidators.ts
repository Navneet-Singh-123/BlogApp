import bodyParser = require('body-parser');
import {body, query} from 'express-validator'
import User from '../models/User'

export class UserValidators {
    static signUp(){
        return [
            body('email', 'Email is Required')
                .isEmail()
                .custom((email, {req}) => {
                   return User.findOne({email: email}).then(user=>{
                        if(user){
                            throw new Error("User already exists");
                        }
                        else{
                            return true;
                        }
                    })
                }),
            body('password', 'Password is Required')
                .isAlphanumeric()
                .isLength({min: 8, max: 20}).withMessage('Password can be from 8-20 characters only'),
            body('username', 'Username is Required').isString()
        ];
    }

    static verifyUser(){
        return [
            body('verification_token', 'Verification Toekn is Required').isNumeric()        ]
    }

    static resendVerificationEmail(){
        return [
            query('email', 'Email is Required').isEmail()
        ]
    }

    static login(){
        return [
            query('email', 'Email is Required')
            .isEmail()
            .custom((email, {req})=>{
                return User.findOne({email: email}).then(user=>{
                    if(user){
                        req.user = user;
                        return true;
                    }
                    else{
                        throw new Error('User does not exist');
                    }
                })
            }),
            query('password', 'Password is Required').isAlphanumeric()
        ]
    }

    static updatePassword(){
        return [
            body('password', 'Password is Required').isAlphanumeric(), 
            body('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            body('new_password', 'New Password is Required')
            .isAlphanumeric()
            .custom((newPassword, {req})=>{
                if(newPassword === req.body.confirm_password){
                    return true;
                }
                else{
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password does not match');
                }
            })
        ]
    }

    static sendResetPasswordEmail(){
        return [
            query('email', 'Email is Required')
            .isEmail()
            .custom((email)=>{
                return User.findOne({email: email}).then(user=>{
                    if(user){
                        return true;
                    }
                    else{
                        throw new Error('Email does not Exist');
                    }
                })
            })
        ]
    }

    static verifyResetPasswordToken(){
        return [
            query('reset_password_token', 'Reset Password Token is Requried')
            .isNumeric()
            .custom((token, {req})=>{
                return User.findOne({reset_password_token: token, reset_password_token_time: {$gt: Date.now()}})
                .then(user=>{
                    if(user){
                        return true;
                    }
                    else{
                        throw new Error('Token does not Exist. Please request for a new One.');
                    }
                })
            })
        ]
    }

    static resetPassword(){
        return [
            body('email', 'Email is Requried')
            .isEmail()
            .custom((email, {req})=>{
                return User.findOne({email: email}).then(user=>{
                    if(user){
                        req.user = user;
                        return true;
                    }
                    else{
                        throw new Error('User does not exist');
                    }
                })
            }),
            body('new_password', 'New Password is Required')
            .isAlphanumeric()
            .custom((newPassword, {req})=>{
                if(newPassword === req.body.confirm_password){
                    return true;
                }
                else{
                    throw new Error('Confirm Password and new Password does not match');
                }
            }), 
            body('confirm_password', 'Confirm  Password is Required').isAlphanumeric(), 
            body('reset_password_token', 'Reset Password Token is required').isNumeric()
            .custom((token, {req})=>{
                if(Number(req.user.reset_password_token) === Number(token)){
                    return true;
                }
                else{
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid. Please Try Again');
                }
            })
        ]
    }
}