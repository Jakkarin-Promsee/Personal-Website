const Diary_Plan = require('../models/DiaryPlan');

const addList = async (userId, date, plan_detail, timeRange, priority, rewardDetail) => {
    try {
        //const date = new Date().toISOString().split('T')[0]; // Get today's date

        // Create a new Plan instance
        const newPlan = new Diary_Plan({
            userId,
            date,
            plan_detail,
            timeRange,
            priority,
            rewardDetail,
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

module.exports = {
    searchList,
    addList,
    checkTask
}