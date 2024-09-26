const express = require('express');
const router = express.Router();

const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

const { renderToDoList } = require('../controllers/toDoListController');

router.get('/', ifNotLoggedin, navbarFunction, renderToDoList);

module.exports = router;