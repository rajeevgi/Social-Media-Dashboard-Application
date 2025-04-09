const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/AuthMiddleware');
const userController = require('../controller/UserController');
const router = express.Router();

// Get All Users (Admin only)
router.get('/getAllUsers',authMiddleware, adminMiddleware, userController.getAllUsers);

// Get Users by Id (Logged-In User)
router.get('/getUserProfile/:id',authMiddleware, userController.getMyProfile);

// Get Users by username
router.get('/getUserByUsername/:username',authMiddleware, userController.getUserProfileByUsername);

// Update User's profile (Admin or User)
router.put('/updateUserProfile/:id',authMiddleware, userController.updateUserProfile);

// Delete User (Admin only)
router.delete('/deleteUserById/:id',authMiddleware, adminMiddleware, userController.deleteUserById);

module.exports = router;