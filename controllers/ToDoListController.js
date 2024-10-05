const todolistService = require('../services/todolistService');

const renderToDoList = (req, res) => {
    let date = req.query.date;

    // If the date isn't provided use the current date (yy-mm-dd)
    if (!date) date = new Date().toISOString().split('T')[0];

    res.render('to-do-list-fetch', {
        active: 2, // highlight at to-do-list in navbar
        buttonInformation: buttonInformation, // send log-in and log-out button information to client
        serveDate: date
    });
};

const loadTasks = async (req, res) => {
    try {
        const userId = req.session.userID;
        let dateParam = req.query.date;

        // If the date isn't provided use the current date (yy-mm-dd)
        if (!dateParam) dateParam = new Date().toISOString().split('T')[0];

        const tasks = await todolistService.searchTaskByDate(userId, dateParam);
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error loading tasks by Date:', err);
        res.status(500).json({ error: 'Failed to load tasks by Date' });
    }
};

const loadTaskById = async (req, res) => {
    try {
        const { taskId } = req.body;

        const task = await todolistService.searchTaskById(taskId);
        res.status(200).json(task);
    } catch (err) {
        console.error('Error loading task by task Id:', err);
        res.status(500).json({ error: 'Failed to load task by task Id' });
    }
}

const checkTask = async (req, res) => {
    try {
        const { taskId, isDone } = req.body;

        await todolistService.checkTask(taskId, isDone);
        res.status(200).json({});
    } catch (err) {
        console.error('Error checking task:', err);
        res.status(500).json({ error: 'Failed to check task' });
    }

}

const addTask = async (req, res) => {
    try {
        const { date, plan_detail, timeRange, priority, reward_detail } = req.body;
        const userId = req.session.userID;

        await todolistService.saveTask(userId, date, plan_detail, timeRange, priority, reward_detail);
        res.status(200).json({});
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Failed to add task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        await todolistService.deleteTask(taskId);
        res.status(200).json({});
    } catch (error) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId, date, plan_detail, timeRange, priority, reward_detail } = req.body;

        await todolistService.updateTask(taskId, {
            date: date,
            plan_detail: plan_detail,
            timeRange: timeRange,
            priority: priority,
            reward_detail: reward_detail
        });
        return res.status(200).json({});
    } catch (error) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Failed to update task' });
    }
}

module.exports = {
    renderToDoList,
    loadTasks,
    addTask,
    checkTask,
    deleteTask,
    loadTaskById,
    updateTask
}