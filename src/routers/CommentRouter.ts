import {Router} from 'express'
import { CommentController } from '../controllers/CommentController';
import { GlobalMiddleware } from '../middlewares/CheckError';
import { CommentValidators } from '../validators/CommentValidators';

class CommentRouter{
    public router: Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes(){
        
    }
    postRoutes(){
        this.router.post('/add/:id',
            GlobalMiddleware.authenticate, 
            CommentValidators.addComment(), 
            GlobalMiddleware.checkError,
            CommentController.addComment
        )
    }
    patchRoutes(){
        
    }
    deleteRoutes(){
        
    }
}
export default new CommentRouter().router;