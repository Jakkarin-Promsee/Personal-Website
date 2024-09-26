const renderToDoList = (req, res) => {
    res.render('to-do-list-fetch', {
        active: 2, // highlight at to-do-list in navbar
        buttonInformation: buttonInformation, // send log-in and log-out button information to client
        data: [
            { done: true, plan: "Making front-end website", time: "12:00-14:00" },
            { done: false, plan: "Read a book at least 30 minutes	", time: "-" },
            { done: false, plan: "Exercise at least 30 minutes", time: "16:30-17:00" }
        ]
    });
}

module.exports = {
    renderToDoList
}