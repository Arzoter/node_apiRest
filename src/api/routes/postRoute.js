module.exports = (server) => {
    const postController = require("../controllers/postController");
    
    server.route("/posts")
        .get(postController.listAllPosts)
        .post(postController.createAPost);

    server.route("/posts/:postId")
        .get(postController.getAPost)
        .put(postController.updatePost)
        .delete(postController.deletePost);
}