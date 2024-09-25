const mongoose = require('mongoose');

const CalendarPlanSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to a user
    date: { type: Date, required: true },
    note: { type: String, required: true }
}, { collection: 'Calendar_Plan' });

module.exports = mongoose.model('CalendarPlan', CalendarPlanSchema);
