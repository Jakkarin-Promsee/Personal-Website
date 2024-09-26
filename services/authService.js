const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (username, email, password) => {
    try {
        // Check if the username and email already exists
        const existingUser = await User.findOne({ username });
        const existingEmain = await User.findOne({ email });

        // If username or email exists, set a message to render the page
        if (existingUser)
            return {
                success: false,
                message: 'Username already exists. Please choose another one.'
            };
        else if (existingEmain)
            return {
                success: false,
                message: 'Email already exists. Please choose another one.'
            };
        else if (password.length < 6)
            return {
                success: false,
                message: 'Password must be at least 6 characters long.'
            };

        //// If all checks pass, hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the new user to MongoDB
        await newUser.save();

        // Return success message
        return {
            success: true,
            message: 'User registered successfully!'
        };

    } catch (error) {
        console.error('Error during registration:', error);
        return {
            success: false,
            message: 'An error occurred during registration. Please try again later.'
        };
    }
}

const loginUser = async (username, password) => {
    try {
        // Check if the user exists in the database
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return {
                success: false,
                message: 'User not found. Please check your username again.'
            };
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return {
                success: false,
                message: 'Incorrect password. Please check your password again.'
            };
        }

        // Successful login
        return {
            success: true,
            user: existingUser
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login. Please try again later.'
        };
    }
};

module.exports = {
    registerUser,
    loginUser
}