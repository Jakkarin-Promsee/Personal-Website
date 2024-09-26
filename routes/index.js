const express = require('express');
const router = express.Router();

const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

const { renderTestPage } = require('../controllers/testController.js');
const { renderHomePage } = require('../controllers/homeController.js');

router.get('/', navbarFunction, renderHomePage);
router.get('/test', ifNotLoggedin, renderTestPage);


module.exports = router;