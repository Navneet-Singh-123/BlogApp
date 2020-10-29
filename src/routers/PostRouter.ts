import {Router} from 'express';
import { PostController } from '../controllers/PostController';
import { UserController } from '../controllers/UserController';
import { GlobalMiddleware } from '../middlewares/CheckError';
import { PostValidators } from '../validators/PostValidators';


class PostRouter{
    public router: Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/me', 
            GlobalMiddleware.authenticate, 
            PostController.getPostByUser
        )
        this.router.get('/all', 
            GlobalMiddleware.authenticate, 
            PostController.getAllPosts
        )
    }
    postRoutes(){
        this.router.post('/add', 
            GlobalMiddleware.authenticate, 
            PostValidators.addPost(), 
            GlobalMiddleware.checkError,
            PostController.addPost
        )
    }
    patchRoutes(){

    }
    deleteRoutes(){

    }
}

export default new PostRouter().router;