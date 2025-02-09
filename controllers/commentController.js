const commentModel = require('../models/commentModel');


const commentCreate = async (req, res) => {
    const {content,authorId, postId} = req.body;
    try {
        const comment = await commentModel.commentCreate(content, authorId, postId);
        res.status(201).json({message: 'Comment created successfully', comment});
        res.json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const commentDelete = async (req, res) => {
    const {id} = req.params;
    const comment = await commentModel.commentDelete(id);
    res.json(comment);
}

module.exports = { commentCreate, commentDelete};