const express = require('express');
const dashboardController = require('../controller/DashboardController');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Get User Dashboard
router.get('/user',authMiddleware, dashboardController.getUserDashboard);

// Get Admin Dashboard
router.get('/admin', authMiddleware, dashboardController.getAdminDashboard);

module.exports = router;