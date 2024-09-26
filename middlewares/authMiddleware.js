const ifNotLoggedin = (req, res, next) => {
    if (!req.session.isLoggedIn) return res.redirect('/users/login?forceLogin=true');
    next();
};

const ifLoggedin = (req, res, next) => {
    if (req.session.isLoggedIn) return res.redirect('/');
    next();
};

module.exports = {
    ifNotLoggedin,
    ifLoggedin
}