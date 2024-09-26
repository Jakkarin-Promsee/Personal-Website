const authService = require('../services/authService');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    // Call the registerUser function from authService
    const result = await authService.registerUser(username, email, password);

    if (result.success) {
        // Render login page with a success message
        return res.render('login-register', {
            isLoggedIn: 0, // user is not logged in yet, return at log in page
            active: 0, // highlight the login button in navbar
            buttonInformation: buttonInformation, // login/logout button info
            popUp: {
                head: 'Register Status:',
                body: result.message
            }
        });
    } else {
        // Render register page with an error message
        return res.render('login-register', {
            isLoggedIn: 1, // user remains on register page
            active: 0, // highlight the register button in navbar
            old_data_register: req.body, // retain user input
            message_register: result.message,
            buttonInformation: buttonInformation
        });
    }
}

const login = async (req, res) => {
    const { username, password, KeepLogin } = req.body;

    // Call the login service to handle authentication
    const result = await authService.loginUser(username, password);

    if (result.success) {
        // Call user information from result
        const { user } = result;

        // Set session variables for the logged-in user
        req.session.isLoggedIn = true;
        req.session.loginTime = Date.now();
        req.session.userID = user._id;
        req.session.KeepLogin = KeepLogin ? true : false;

        // Optionally, you could redirect to the home page instead of rendering the login page
        return res.render('login-register', {
            isLoggedIn: 0, // user is now logged in
            active: 0, // highlight login button in navbar
            buttonInformation: buttonInformation,
            popUp: {
                head: "Login Status:",
                body: "Login successful!",
                href: "/" // return to home page when close this pupUp
            }
        });
    } else {
        // Render the login page with an error message
        return res.render('login-register', {
            isLoggedIn: 0, // user stays on login page
            active: 0, // highlight the login button in navbar
            old_data_login: req.body, // retain user input
            message_login: result.message,
            buttonInformation: buttonInformation
        });
    }
}

const logout = (req, res) => {
    // Destroy session and return to home page
    req.session = null;
    res.redirect('/');
}

module.exports = {
    register,
    login,
    logout
};