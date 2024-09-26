const express = require('express');
const router = express.Router();

const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

const { renderLogin_RegisterController } = require('../controllers/loginRegisterController.js');
const { renderForgetPassword } = require('../controllers/forgetPasswordController.js');
// const { renderProfile } = require('../controllers/renderProfile.js');

router.get('/login', ifLoggedin, navbarFunction, renderLogin_RegisterController);
router.get('/forget-password', ifLoggedin, renderForgetPassword);
// router.get('profile', navbarFunction, renderProfile);

module.exports = router;