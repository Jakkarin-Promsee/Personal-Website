const Diary_Plan = require('../models/DiaryPlan');

// Find all tasks for the specific user and date
const searchTaskByDate = async (userId, date) => {
    try {
        return await Diary_Plan.find({
            userId: userId,
            date: date
        });
    } catch (error) {
        throw new Error('Error fetching tasks by date');
    }
};

// Find all tasks for the specific taskId
const searchTaskById = async (taskId) => {
    try {
        return await Diary_Plan.findById(taskId);
    } catch (err) {
        throw new Error('Error fetching tasks by Id');
    }
}

// Find all tasks by taskId and update 'done' status
const checkTask = async (taskId, isDone) => {
    try {
        await Diary_Plan.findByIdAndUpdate(taskId, { done: isDone });
    } catch (error) {
        throw new Error('Error updating task status');
    }
};

const saveTask = async (userId, date, plan_detail, timeRange, priority, reward_detail) => {
    try {
        const newPlan = new Diary_Plan({
            userId,
            date,
            plan_detail,
            timeRange,
            priority,
            reward_detail
        });
        await newPlan.save();
    } catch (error) {
        throw new Error('Failed saving task status');
    }
};

const deleteTask = async (taskId) => {
    try {
        await Diary_Plan.deleteOne({ _id: taskId });
    } catch (error) {
        throw new Error('Error deleting task by Id')
    }
};

const updateTask = async (taskId, task) => {
    try {
        await Diary_Plan.findByIdAndUpdate(taskId, task, { new: true });
    } catch (err) {
        throw new Error('Error updating task by Id')
    }
}

module.exports = {
    searchTaskByDate,
    searchTaskById,
    saveTask,
    checkTask,
    deleteTask,
    updateTask
}