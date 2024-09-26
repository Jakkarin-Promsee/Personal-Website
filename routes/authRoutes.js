// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import middlewares function
const { ifLoggedin } = require('../middlewares/authMiddleware');
const { navbarFunction } = require('../middlewares/navbarMiddleware.js');

// Import controller function
const { login, register, logout } = require('../controllers/authController');

router.post('/register', ifLoggedin, navbarFunction, register);
router.post('/login', ifLoggedin, navbarFunction, login);
router.get('/logout', logout);

module.exports = router;
