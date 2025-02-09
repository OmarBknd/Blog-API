const postModel = require('../models/postModel');
const {body, validationResult} = require('express-validator');

const validateResults = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
];

const postGetAll = async (req, res) => {
    try {
        const posts = await postModel.postGetAll();
        res.status(200).json({message: 'Posts fetched successfully', posts});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postCreate = [validateResults, async (req, res) => {
    const {title, content, authorId} = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const post = await postModel.postCreate(title, content, authorId);
        res.status(201).json({message: 'Post created successfully', post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
]
const postUpdate = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    try {
        const post = await postModel.postUpdate(id, title, content);
        res.status(200).json({message: 'Post updated successfully', post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {postGetAll, postCreate, postUpdate};