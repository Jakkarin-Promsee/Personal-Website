const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
const connectDB = require('./config/db');
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set cookie session middleware
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 3600 * 1000 // 1day
}));

// Connect Bootstrap 5
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// Import middlewares check timeout function function
const { isTimeout } = require('./middlewares/timeoutMiddleware');
app.use(isTimeout);

// Import the routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

// Use route files
app.use('/', indexRoutes);          // General routes
app.use('/auth', authRoutes);       // Authentication routes
app.use('/todos', todoRoutes);       // To-do list routes
app.use('/users', userRoutes);       // User profile routes

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Server Error');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});