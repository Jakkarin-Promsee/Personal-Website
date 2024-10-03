const Diary_Plan = require('../models/DiaryPlan');

// Service function to search for tasks by user and date
const searchList = async (userId, date) => {
    // console.log(userId, date);
    // testing call function

    try {
        // Find all tasks for the specific user and date
        const tasks = await Diary_Plan.find({
            userId: userId, // Match tasks by user ID
            date: date
        });

        return tasks;
    } catch (error) {
        throw new Error('Error fetching tasks');
    }
};

const searchTaslById = async (taskId) => {
    try {
        const task = await Diary_Plan.findById(taskId);
        return task;
    } catch (err) {
        throw new Error('Error fetching tasks');
    }
}

const addList = async (userId, date, plan_detail, timeRange, priority, reward_detail) => {
    try {
        //const date = new Date().toISOString().split('T')[0]; // Get today's date

        // Create a new Plan instance
        const newPlan = new Diary_Plan({
            userId,
            date,
            plan_detail,
            timeRange,
            priority,
            reward_detail,
        });

        // Save to the database
        const savedPlan = await newPlan.save();
        return savedPlan; // Return the saved plan
    } catch (error) {
        console.error("Error saving plan:", error);
        throw new Error('Failed to save the plan');
    }
};

const checkTask = async (taskId, isDone) => {
    try {
        // Update the task's done status in the database
        await Diary_Plan.findByIdAndUpdate(taskId, { done: isDone });
    } catch (error) {
        throw new Error('Error updating task status');
    }
};

const deleteTask = async (taskId) => {
    try {
        const task = await Diary_Plan.deleteOne({ _id: taskId });
        return task;
    } catch (error) {
        throw new Error('Error fetching tasks')
    }
};

const updateTask = async (taskId, task) => {
    try {
        const newTask = await Diary_Plan.findByIdAndUpdate(taskId, task, { new: true });
        return newTask;
    } catch (err) {
        throw new Error('Error fetching task')
    }
}

module.exports = {
    searchList,
    addList,
    checkTask,
    deleteTask,
    searchTaslById,
    updateTask
}