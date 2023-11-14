const Comment = require('../models/commentModel');

exports.listAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.post_id });
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.createAComment = async (req, res) => {
    const newComment = new Comment({ ...req.body, post_id: req.params.post_id });
    try {
        const comment = await newComment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getAComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.comment_id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found.' });
            return;
        }
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.updateAComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
        req.params.comment_id,
        req.body,
        { new: true }
        );
        if (!updatedComment) {
            res.status(404).json({ message: 'Comment not found.' });
            return;
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.deleteAComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.comment_id);
        if (!deletedComment) {
            res.status(404).json({ message: 'Comment not found.' });
            return;
        }
        res.status(204).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }
};