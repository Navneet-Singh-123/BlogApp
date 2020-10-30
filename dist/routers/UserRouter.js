"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const CheckError_1 = require("../middlewares/CheckError");
const Utils_1 = require("../utils/Utils");
const UserValidators_1 = require("../validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification/email', CheckError_1.GlobalMiddleware.authenticate, UserController_1.UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators_1.UserValidators.login(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.login);
        this.router.get('/reset/password', UserValidators_1.UserValidators.sendResetPasswordEmail(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', UserValidators_1.UserValidators.verifyResetPasswordToken(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyResetPasswordToken);
    }
    postRoutes() {
        this.router.post('/signup', UserValidators_1.UserValidators.signUp(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.signUp);
    }
    patchRoutes() {
        this.router.patch('/verify', CheckError_1.GlobalMiddleware.authenticate, UserValidators_1.UserValidators.verifyUser(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.verify);
        this.router.patch('/update/password', CheckError_1.GlobalMiddleware.authenticate, UserValidators_1.UserValidators.updatePassword(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.updatePassword);
        this.router.patch('/reset/password', UserValidators_1.UserValidators.resetPassword(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.resetPassword);
        this.router.patch('/update/profilePic', CheckError_1.GlobalMiddleware.authenticate, new Utils_1.Utils().multer.single('profile_pic'), UserValidators_1.UserValidators.updateProfilePic(), CheckError_1.GlobalMiddleware.checkError, UserController_1.UserController.updateProfilePic);
    }
    deleteRoutes() {
    }
}
exports.default = new UserRouter().router;
