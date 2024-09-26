const navbarFunction = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        // If user isn't logged in, show log in button.
        log_link = '/users/login';
        log = 'Log in';
    }
    else {
        // If user is logged in, show log out button.
        log_link = '/auth/logout';
        log = 'Log out';
    }

    buttonInformation = { log_link: log_link, log: log };

    next();
}

module.exports = {
    navbarFunction
}