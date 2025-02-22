const commentModel = require('../models/commentModel');
const {body, validationResult} = require('express-validator');

const validateComment = [
    body('content').notEmpty().withMessage('Content is required'),
];

const commentsGetAll = async (req, res) => {
    try {
        const comments = await commentModel.commentsGetAll()
        res.status(200).json({message: 'commentss fetched successfully', comments});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const commentCreate = [
    validateComment,
    async (req, res) => {
      const { content } = req.body;
      const { postId } = req.params; 
      const authorId = req.user.id; // Extract from JWT authentication
  
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const comment = await commentModel.commentCreate(content, authorId, postId);
        return res.status(201).json({ message: "Comment created successfully", comment });
  
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
  ];
  
const commentDelete = async (req, res) => {
  try{
    const {commentId} = req.params;
    const authorId = req.user.id
    const isAdmin = req.user.role === 'ADMIN';
    const comment = await commentModel.findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.authorId !== authorId && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
  }
    await commentModel.commentDelete(commentId)
    res.json(comment);
}catch (error) {
        res.status(500).json({ message: error.message });
    }}

const commentUpdate = async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;
    const userId = req.user.id
    const isAdmin= req.user.role ==='ADMIN'
    try {
        const userComment = await commentModel.findCommentById(commentId)
        if (userComment.authorId !== userId && !isAdmin) {
            return res.status(403).json({ message: "Unauthorized to update this comment" });
        }
        const comment = await commentModel.commentUpdate(commentId, content);
        res.status(200).json({message: 'Comment updated successfully', comment});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}    

module.exports = { commentsGetAll, commentCreate, commentDelete, commentUpdate};