const express = require('express');
const commentController = require('../controller/CommentController');
const { authMiddleware, adminMiddleware } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Add a comment
router.post('/addComment',authMiddleware, commentController.addComment);

// Get All Comments by PostID
router.get('/getAllComments/:postId',authMiddleware, commentController.getComments);

// Get All Comments
// router.get('/getAllComments', commentController.getComments);

// Delete a comment
router.delete('/deleteComment/:id',authMiddleware, commentController.deleteComment);

// Edit a comment
router.put('/editComment/:id',authMiddleware, commentController.editComment);

module.exports = router;