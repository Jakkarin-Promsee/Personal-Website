const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Impost Schema db
const CalendarPlan = require('../models/CalendarPlan');
const DiaryPlan = require('../models/DiaryPlan');
const FussyPlan = require('../models/FussyPlan');
const MorningPage = require('../models/MorningPage');
const User = require('../models/User');
const { render } = require('ejs');

// Middleware to check for the session timeout (If user not check 'KeepLogin' button)
function isTimeout(req, res, next) {
    if (!req.session.KeepLogin) {
        const sessionTimeout = 60 * 1000; // 60 minute test in milliseconds
        const currentTime = Date.now();

        if (!req.session.loginTime) req.session.loginTime = currentTime;
        else {
            const timeElapsed = currentTime - req.session.loginTime;
            if (timeElapsed > sessionTimeout) {
                // Set session param to null, then this param will process in another function) 
                req.session.isLoggedIn = null;
                req.session.currentTime = null;
            }
        }

        // Reset time out
        req.session.currentTime = currentTime;
    }

    // Proceed to the next middleware or route
    next();
}

// Apply the middleware to all routes
router.use(isTimeout);

const ifNotLoggedin = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login?forceLogin=true');
    }
    next();
}

const ifLoggedin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    next();
}

const navbarFunction = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        // If user isn't logged in, show log in button.
        log_link = '/login';
        log = 'Log in';
    }
    else {
        // If user is logged in, show log out button.
        log_link = '/logout';
        log = 'Log out';
    }

    buttonInformation = { log_link: log_link, log: log };

    next();
}

router.get('/test', ifNotLoggedin, (req, res) => {
    res.render('test');
    // res.render('test', { popUp: { popUpHead: "Register Status", popUpBody: "Register successfully!" } });

    // res.send(req.session.userID);

    // const insertDiaryPlan = async () => {
    //     try {
    //         const diaryPlanData = {
    //             user_id: req.session.userID, // replace with an actual ObjectId
    //             date: new Date(),
    //             plan_detail: 'Complete Node.js project',
    //             is_done: false,
    //             priority: 2
    //         };

    //         const newDiaryPlan = new DiaryPlan(diaryPlanData);
    //         const result = await newDiaryPlan.save();
    //         console.log('Diary plan saved successfully:', result);
    //     } catch (err) {
    //         console.error('Error saving diary plan:', err);
    //     }
    // };

    // // Call the function to insert the example data
    // insertDiaryPlan();

});

router.get('/', navbarFunction, (req, res) => {

    res.render('home', {
        active: 1, // highlight at home in navbar
        buttonInformation: buttonInformation // send log-in and log-out button information to client
    });
});

router.get('/login', ifLoggedin, navbarFunction, (req, res, next) => {
    // If link path paramiter has ?register=true, Then go to page with register page first.
    const registerParam = req.query.register === 'true';
    const forceLogin = req.query.forceLogin === 'true';

    if (forceLogin) popUp = {
        head: "User Invalid:",
        body: "You need to login!",
    };
    else popUp = null;

    if (registerParam) {
        return res.render('login-register', {
            isLoggedIn: 1, // return to register side of page 
            active: 0, // highlight at the login-logout button in navbar
            buttonInformation: buttonInformation, // send log-in and log-out button information to client
            popUp: popUp
        });
    }

    res.render('login-register', {
        active: 0, // highlight at the login-logout button in navbar
        buttonInformation: buttonInformation, // send log-in and log-out button information to client
        popUp: popUp
    });
});

router.get('/forget-password', ifLoggedin, (req, res) => {
    res.send('Sorry, I can\'t remember too.')
});

router.get('/to-do-list', ifNotLoggedin, navbarFunction, (req, res) => {
    res.render('to-do-list', {
        active: 2, // highlight at to-do-list in navbar
        buttonInformation: buttonInformation, // send log-in and log-out button information to client
        data: [
            { done: true, plan: "Making front-end website", time: "12:00-14:00" },
            { done: false, plan: "Read a book at least 30 minutes	", time: "-" },
            { done: false, plan: "Exercise at least 30 minutes", time: "16:30-17:00" }
        ]
    });
});

router.post('/register', ifLoggedin, navbarFunction, async (req, res) => {
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
});

router.post('/login', ifLoggedin, navbarFunction, async (req, res) => {
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
});

router.get('/logout', (req, res) => {
    //session destroy
    req.session = null;
    res.redirect('/');
});

// retrn status 404 when link path is not correct
router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});


module.exports = router;