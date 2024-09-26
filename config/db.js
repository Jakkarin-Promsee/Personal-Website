// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI; // Ensure this is set in your .env file
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB connected!'))
        .catch(err => {
            console.error(`Error connecting to MongoDB: ${err.message}`);
            process.exit(1); // Exit process with failure
        });
};

module.exports = connectDB;