const commentModel = require('../models/commentModel');
const {body, validationResult} = require('express-validator');

const validateComment = [
    body('content').notEmpty().withMessage('Content is required'),
];


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
    const {id} = req.params;
    const comment = await commentModel.commentDelete(id);
    res.json(comment);
}

module.exports = { commentCreate, commentDelete};