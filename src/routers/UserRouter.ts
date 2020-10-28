import {Router} from 'express';
import { UserController } from '../controllers/UserController';
import { GlobalMiddleware } from '../middlewares/CheckError';
import { Utils } from '../utils/Utils';
import { UserValidators } from '../validators/UserValidators';

class UserRouter{
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes(){
        this.router.get('/send/verification/email', 
            GlobalMiddleware.authenticate, 
            UserController.resendVerificationEmail
        )
        this.router.get('/login', 
            UserValidators.login(), 
            GlobalMiddleware.checkError,  
            UserController.login
        )
        this.router.get('/reset/password', 
            UserValidators.sendResetPasswordEmail(), 
            GlobalMiddleware.checkError,
            UserController.sendResetPasswordEmail
        )
        this.router.get('/verify/resetPasswordToken', 
            UserValidators.verifyResetPasswordToken(), 
            GlobalMiddleware.checkError, 
            UserController.verifyResetPasswordToken
        )
    }
    postRoutes(){
        this.router.post('/signup', 
            UserValidators.signUp(),  
            GlobalMiddleware.checkError,
            UserController.signUp
        );
    }
    patchRoutes(){
        this.router.patch('/verify', 
            UserValidators.verifyUser(),
            GlobalMiddleware.checkError,
            GlobalMiddleware.authenticate,
            UserController.verify
        );
        this.router.patch('/update/password', 
            UserValidators.updatePassword(), 
            GlobalMiddleware.checkError, 
            GlobalMiddleware.authenticate, 
            UserController.updatePassword
        );
        this.router.patch('/reset/password', 
            UserValidators.resetPassword(), 
            GlobalMiddleware.checkError, 
            UserController.resetPassword
        )
        this.router.patch('/update/profilePic', 
            GlobalMiddleware.authenticate,
            new Utils().multer.single('profile_pic'), 
            UserValidators.updateProfilePic(), 
            GlobalMiddleware.checkError, 
            UserController.updateProfilePic
        )
    }
    deleteRoutes(){

    }
}

export default new UserRouter().router;