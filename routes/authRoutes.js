const express = require('express');
const router = express.Router();

const { ifLoggedin } = require('../middlewares/authMiddleware');
const { navbarFunction } = require('../middlewares/navbarMiddleware.js');

const { login, register, logout } = require('../controllers/authController');

router.post('/register', ifLoggedin, navbarFunction, register);
router.post('/login', ifLoggedin, navbarFunction, login);
router.get('/logout', logout);

module.exports = router;
