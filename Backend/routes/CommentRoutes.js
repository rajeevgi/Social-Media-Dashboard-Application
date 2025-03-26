const express = require('express');
const commentController = require('../controller/CommentController');
const { authMiddleware, adminMiddleware } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Add a comment
router.post('/addComment',authMiddleware, commentController.addComment);

// Delete a comment
router.delete('/deleteComment/:id',authMiddleware, commentController.deleteComment);

// Edit a comment
router.put('/editComment/:id',authMiddleware, commentController.editComment);

module.exports = router;