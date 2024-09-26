// controllers/homeController.js

exports.renderHomePage = (req, res) => {
    res.render('home', {
        active: 1, // highlight at home in navbar
        buttonInformation: buttonInformation // send log-in and log-out button information to client
    });
};