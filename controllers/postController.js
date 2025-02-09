const postModel = require('../models/postModel');

const postGetAll = async (req, res) => {
    try {
        const posts = await postModel.postGetAll();
        res.status(200).json({message: 'Posts fetched successfully', posts});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postCreate = async (req, res) => {
    const {title, content, authorId} = req.body;
    try {
        const post = await postModel.postCreate(title, content, authorId);
        res.status(201).json({message: 'Post created successfully', post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

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