const express = require('express');
const { register, login } = require('../controller/AuthController');
const router = express.Router();

// Registration
router.post('/register', register);

// Login
router.post('/login', login);

module.exports = router;