const commentModel = require('../models/commentModel');
const {body, validationResult} = require('express-validator');

const validateComment = [
    body('content').notEmpty().withMessage('Content is required'),
];


const commentCreate = [validateComment, async (req, res) => {
    const {content,authorId, postId} = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const comment = await commentModel.commentCreate(content, authorId, postId);
        res.status(201).json({message: 'Comment created successfully', comment});
        res.json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
]
const commentDelete = async (req, res) => {
    const {id} = req.params;
    const comment = await commentModel.commentDelete(id);
    res.json(comment);
}

module.exports = { commentCreate, commentDelete};