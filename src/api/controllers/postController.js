const Post = require("../models/postModel");

exports.listAllPosts = async(req, res) => {
    /* ES5
    Post.find({}, (error, posts) => {
            if(error) {
                res.status(500);
                console.log(error);
                res.json({message: "Erreur serveur"});
            } else {
                res.status(200);
                res.json(posts);
            }
        })
    */
    
    // ES6
    try {
        const posts = await Post.find({});
        res.status(200);
        res.json(posts);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.createAPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(201);
        res.json(post);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true }
        );
        if (!updatedPost) {
            res.status(404);
            res.json({ message: "Post not found." });
            return;
        }
        res.status(200);
        res.json(updatedPost);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};
  
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        if (!deletedPost) {
            res.status(404);
            res.json({ message: "Post not found." });
            return;
        }
        res.status(204);
        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};