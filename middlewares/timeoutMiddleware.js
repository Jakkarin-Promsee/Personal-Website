// middlewares/timeoutMiddleware.js

exports.isTimeout = (req, res, next) => {
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
};