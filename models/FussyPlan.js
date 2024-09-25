const mongoose = require('mongoose');

const FussyPlanSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to a user
    plan_detail: { type: String, required: true },
    priority: { type: Number, required: true, min: 0, max: 3 }
}, { collection: 'Fussy_Plan' });

module.exports = mongoose.model('FussyPlan', FussyPlanSchema);
