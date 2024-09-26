const renderLogin_RegisterController = (req, res, next) => {
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
}

module.exports = {
    renderLogin_RegisterController
}