const express = require('express');
const router = express.Router();

const { ifLoggedin, ifNotLoggedin } = require('../middlewares/authMiddleware.js');
const { navbarFunction } = require('../middlewares/navbarMiddleware');

const controllers = require('../controllers/toDoListController');

router.use(ifNotLoggedin);

// Defult webpage
router.get('/', navbarFunction, controllers.renderToDoList);

// Fetch tasks for a specific date (or today if no date is provided)
router.get('/loadtaskbydate', controllers.loadTasks);
router.post('/loadtaskbyid', controllers.loadTaskById);
router.post('/checktask', controllers.checkTask);
router.post('/addtask', controllers.addTask);
router.post('/deletetask', controllers.deleteTask);
router.post('/updatetask', controllers.updateTask)

module.exports = router;