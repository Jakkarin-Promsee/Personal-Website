// routes/todoRoutes.js
const express = require('express');
const router = express.Router();

// Import middlewares function
const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

// Import controller function
const { renderToDoList } = require('../controllers/toDoListController');

router.get('/', ifNotLoggedin, navbarFunction, renderToDoList);

module.exports = router;