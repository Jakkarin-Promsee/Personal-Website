// middlewares/authMiddleware.js

exports.ifNotLoggedin = (req, res, next) => {
    if (!req.session.isLoggedIn) return res.redirect('/login?forceLogin=true');
    next();
};

exports.ifLoggedin = (req, res, next) => {
    if (req.session.isLoggedIn) return res.redirect('/');
    next();
};