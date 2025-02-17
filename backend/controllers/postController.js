const postModel = require('../models/postModel');
const {body, validationResult} = require('express-validator');

const validateResults = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
];

const postGetById = async(req,res) => {
    const{postId} = req.params
    try{
        const post = await postModel.findPostById(postId)
        res.status(200).json({message:' post fetched successfully', post})
    }catch(error){
        res.status(500).json({message:'failed to  fetch post', error: error.message})
    }
    
}

const postGetAll = async (req, res) => {
    try {
        const posts = await postModel.postGetAll();
        res.status(200).json({message: 'Posts fetched successfully', posts});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postGetByUserId = async (req,res) => {
    const{id}= req.params
    try{
        const posts = await postModel.postGetByUserId(id)
        res.status(200).json({message:'User posts fetched successfully', posts})
    }catch(error){
        res.status(500).json({message:'failed to fetch user posts', error: error.message})
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
    const {postId} = req.params;
    const {title, content} = req.body;
    const userId = req.user.id
    try {
        const userPost = await postModel.findPostById(postId)
        if (userPost.authorId !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }
        const post = await postModel.postUpdate(postId, title, content);
        res.status(200).json({message: 'Post updated successfully', post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postDelete = async(req,res) => {
    const {postId} = req.params
    const authorId = req.user.id
    try{
        const userPost = await postModel.findPostById(postId)
        if(userPost.authorId !== authorId){
            res.status(403).json({message:"Unauthorized to delete this post"})
        }
        const post = await postModel.postDelete(postId)
        res.status(200).json({message: 'Post deleted successfully', post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {postGetAll, postCreate, postUpdate, postDelete, postGetByUserId, postGetById };