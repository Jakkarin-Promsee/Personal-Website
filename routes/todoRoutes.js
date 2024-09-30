const express = require('express');
const router = express.Router();

const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

const controllers = require('../controllers/toDoListController');

router.get('/', ifNotLoggedin, navbarFunction, controllers.renderToDoList);

// Fetch tasks for a specific date (or today if no date is provided)
router.get('/task', ifNotLoggedin, controllers.loadTasks);
router.post('/checktask', ifNotLoggedin, controllers.checkTask);
router.post('/addtask', ifNotLoggedin, controllers.addTask);


module.exports = router;