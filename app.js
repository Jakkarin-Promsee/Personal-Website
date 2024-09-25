const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');

const app = express();

// Middleware to parse JSON
// To parse JSON requset body
app.use(express.json());
// To parse form data
app.use(express.urlencoded({ extended: true }));

// Set public to another file
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set cookie session middleware to keep users information
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 3600 * 1000 // 1day
}));

// MongoDB connection URL
const mongoURI = 'mongodb://0.0.0.0:27017/Diary_Routine_DB';

// Connect bootstap 5
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// Import the routes
const routes = require('./routes/routes');
app.use('/', routes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});