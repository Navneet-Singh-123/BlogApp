"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const CheckError_1 = require("../middlewares/CheckError");
const PostValidators_1 = require("../validators/PostValidators");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/me', CheckError_1.GlobalMiddleware.authenticate, PostController_1.PostController.getPostByUser);
        this.router.get('/all', CheckError_1.GlobalMiddleware.authenticate, PostController_1.PostController.getAllPosts);
        this.router.get('/:id', CheckError_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.getPostById(), CheckError_1.GlobalMiddleware.checkError, PostController_1.PostController.getPostById);
    }
    postRoutes() {
        this.router.post('/add', CheckError_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.addPost(), CheckError_1.GlobalMiddleware.checkError, PostController_1.PostController.addPost);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', CheckError_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.editPost(), CheckError_1.GlobalMiddleware.checkError, PostController_1.PostController.editPost);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', CheckError_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.deletePost(), CheckError_1.GlobalMiddleware.checkError, PostController_1.PostController.deletePost);
    }
}
exports.default = new PostRouter().router;
