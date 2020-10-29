import Post from '../models/Post'

export class PostController{
    static async addPost(req, res, next){
        const userId = req.user.user_id;
        const content = req.body.content;
        const newPost = new Post({
            user_id: userId, 
            content: content, 
            created_at: new Date(), 
            updated_at: new Date()
        })
        try{
            let post = await new Post(newPost).save();
            res.send(post);
        }catch(err){
            next(err);
        }

    }
}