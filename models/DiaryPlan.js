const mongoose = require('mongoose');


const DiaryPlanSchema = new mongoose.Schema({
    userId: {
        type: String,   // Assuming userID is stored as a string
        required: true, // User ID is required
    },
    date: {
        type: String,   // Storing date as a string in 'YYYY-MM-DD' format
        required: true,
    },
    done: {
        type: Boolean,
        require: false,
        default: false
    },
    plan_detail: {
        type: String,   // Description of the task
        required: true,
        default: "", // Default plan detail
    },
    timeRange: {
        type: [String], // Array of two time strings ["start", "end"]
        validate: [arrayLimit, '{PATH} must have two elements: start and end time'],
        required: false,
        default: ['', ''],
    },
    priority: {
        type: Number,   // Priority as an integer (e.g., 0 for low, 1 for high)
        validate: [priorityLimit, '{PATH} must have priority 0-3'],
        required: false,
        default: 3,     // Default priority is 3, not urget and hurry
    },
    reward_detail: {
        type: String,   // Priority as an integer (e.g., 0 for low, 1 for high)
        required: false,
        default: "",     // Default priority is 0
    }
}, { collection: 'Diary_Plan' });

// Custom validation to ensure timeRange has exactly two elements
function arrayLimit(val) {
    return val.length <= 2;
}

function priorityLimit(val) {
    return val >= 0 && val <= 3;
}

module.exports = mongoose.model('DiaryPlan', DiaryPlanSchema);
