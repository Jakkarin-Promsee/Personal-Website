const mongoose = require('mongoose');

const MorningPageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to a user
    date: { type: Date, required: true },
    go_to_bed: { type: String, required: true }, // Format HH:mm
    sleep: { type: String, required: true },     // Format HH:mm
    wake_up: { type: String, required: true },   // Format HH:mm
    morning_diary: { type: String, required: true, maxlength: 4000, minlength: 0 }
}, { collection: 'Morning_Page' });

module.exports = mongoose.model('MorningPage', MorningPageSchema);
