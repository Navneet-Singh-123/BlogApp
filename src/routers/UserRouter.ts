import {Router} from 'express';
import { UserController } from '../controllers/UserController';
import { GlobalMiddleware } from '../middlewares/CheckError';
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
            UserValidators.verifyUser,
            GlobalMiddleware.checkError,
            UserController.verify
        );
    }
    deleteRoutes(){

    }
}

export default new UserRouter().router;