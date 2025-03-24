const express = require('express');
const postController = require('../controller/PostController');
const { authMiddleware, adminMiddleware } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Get All Posts (Global Feeds)
router.get('/getAllPosts',authMiddleware, postController.getAllPost);

// Get Users post by Id.
router.get('/getMyPost/:id',authMiddleware, postController.getMyPost);

// Create or Upload Post
router.post('/createPost',authMiddleware, postController.createPost);

// Update a Post
router.put('/updatePost/:id',authMiddleware, postController.updatePost);

module.exports = router;