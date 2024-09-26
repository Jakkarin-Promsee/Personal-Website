// controllers/authController
const bcrypt = require('bcrypt');

// Import Schema for mongoDB
const CalendarPlan = require('../models/CalendarPlan');
const DiaryPlan = require('../models/DiaryPlan');
const FussyPlan = require('../models/FussyPlan');
const MorningPage = require('../models/MorningPage');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    try {
        // Check if the username and email already exists
        const existingUser = await User.findOne({ username });
        const existingEmain = await User.findOne({ email });

        // If username or email exists, set a message to render the page
        if (existingUser) message = 'Username already exists. Please choose another one.';
        else if (existingEmain) message = 'Email already exists. Please choose another one.';
        else if (password.length < 6) message = 'Password must be at least 6 characters long.';
        else {
            // If username and email doesn't exist, hash the password and create a new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });

            // Save the new user to MongoDB
            await newUser.save();

            // Send a success message and render the page
            return res.render('login-register', {
                isLoggedIn: 0, // return to login page
                active: 0, // highlight at the login-logout button in navbar
                buttonInformation: buttonInformation, // send log-in and log-out button information to client
                popUp: {
                    head: "Register Status:",
                    body: "User registered successfully!"
                }
            });
        }

        return res.render('login-register', {
            isLoggedIn: 1, // return to register page
            active: 0, // highlight at the login-logout button in navbar
            old_data_register: req.body,
            message_register: message,
            buttonInformation: buttonInformation // send log-in and log-out button information to client
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.render('login-register', {
            isLoggedIn: 1, // return to register page
            active: 0, // highlight at the login-logout button in navbar
            old_data_register: req.body,
            message_register: 'An error occurred. Please try again later.',
            buttonInformation: buttonInformation
        });
    }
}

exports.login = async (req, res) => {
    const { username, password, KeepLogin } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ username });

        if (!existingUser) message = 'User not found. Please check your username again.';
        else {
            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, existingUser.password);

            if (!isMatch) message = 'Incorrect password. Please check your password again.';
            else {
                // Set session variables, user userID to find data
                req.session.isLoggedIn = true;
                req.session.loginTime = Date.now();
                req.session.userID = existingUser._id;

                if (KeepLogin) req.session.KeepLogin = true;
                else req.session.KeepLogin = false;



                return res.render('login-register', {
                    isLoggedIn: 0, // return to log in page 
                    active: 0, // highlight at the login-logout button in navbar
                    buttonInformation: buttonInformation,
                    popUp: {
                        head: "Register Status:",
                        body: "User registered successfully!",
                        href: "/"
                    }
                });

                // Redirect to home page
                // return res.redirect('/');
            }
        }

        return res.render('login-register', {
            isLoggedIn: 0, // return to log in page 
            active: 0, // highlight at the login-logout button in navbar
            old_data_login: req.body,
            message_login: message,
            buttonInformation: buttonInformation
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.render('login-register', {
            isLoggedIn: 0, // return to log in page 
            active: 0, // highlight at the login-logout button in navbar
            old_data_login: req.body,
            message_login: 'An error occurred. Please try again later.',
            buttonInformation: buttonInformation
        });
    }
}

exports.logout = (req, res) => {
    //session destroy
    req.session = null;
    res.redirect('/');
}