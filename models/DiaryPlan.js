const mongoose = require('mongoose');

const DiaryPlanSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to a user
    date: { type: Date, required: true },
    plan_detail: { type: String, required: true },
    is_done: { type: Boolean, required: true, default: false },
    priority: { type: Number, required: true, min: 0, max: 3 }
}, { collection: 'Diary_Plan' });

module.exports = mongoose.model('DiaryPlan', DiaryPlanSchema);
