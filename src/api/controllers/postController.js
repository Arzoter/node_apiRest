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
        res.status(200).json(posts);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." })
    }
}

exports.createAPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." })
    }
}

exports.getAPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true }
        );
        if (!updatedPost) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};
  
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        if (!deletedPost) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(204).json({ message: "Post deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};