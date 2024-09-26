// routes/routes.js
const express = require('express');
const router = express.Router();

// Import middlewares function
const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

// Import controller function
const { renderTestPage } = require('../controllers/testController.js');
const { renderHomePage } = require('../controllers/homeController.js');

router.get('/', navbarFunction, renderHomePage);
router.get('/test', ifNotLoggedin, renderTestPage);


module.exports = router;