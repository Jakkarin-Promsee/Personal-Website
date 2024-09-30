const todolistService = require('../services/todolistService');

const renderToDoList = (req, res) => {
    res.render('to-do-list-fetch', {
        active: 2, // highlight at to-do-list in navbar
        buttonInformation: buttonInformation, // send log-in and log-out button information to client
    });
};

const loadTasks = async (req, res) => {
    try {
        const userId = req.session.userID;

        // Get the date from the query string (e.g., ?date=27-09-2023)
        let dateParam = req.query.date;

        // If the date is provided, parse it; otherwise, use the current date
        if (!dateParam) {
            dateParam = new Date().toISOString().split('T')[0];  // Use today's date if no date is provided
        }

        console.log(new Date(dateParam).toISOString().split('T')[0]);

        // Call the service to fetch tasks for the given date
        const tasks = await todolistService.searchList(userId, dateParam);
        res.status(200).json(tasks);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load tasks' });
    }
};

const checkTask = async (req, res) => {
    const userId = req.session.userID;
    const { taskId, isDone } = req.body;

    try {
        // Call the service to update the task's status
        await todolistService.checkTask(taskId, isDone);
        res.status(200).json({ isDone: isDone, message: 'Task status updated successfully' });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Failed to update task' });
    }

}

const addTask = async (req, res) => {
    try {
        // const userId = req.session.userID;
        // const date = new Date().toISOString().split('T')[0];
        // const plan_detail = "watch the movie";
        // const timeRange = ["22:00", "22:30"];
        // const priority = 3;

        const { date, plan_detail, timeRange, priority, rewardDetail } = req.body;
        const userId = req.session.userID;

        const savedPlan = await todolistService.addList(userId, date, plan_detail, timeRange, priority, rewardDetail);

        // Call the service to save the plan
        // const savedPlan = await todolistService.addList(userId, plan_detail, timeRange, priority);

        // Send a success response
        return res.status(201).json({
            message: "Plan saved successfully!",
            plan: savedPlan
        });
    } catch (error) {
        // Handle error response
        return res.status(500).json({
            message: "Error saving the plan",
            error: error.message,
        });
    }



    res.send('GG');

    console.log([userId, date, plan_detail, timeRange, priority]);

};

module.exports = {
    renderToDoList,
    loadTasks,
    addTask,
    checkTask
}