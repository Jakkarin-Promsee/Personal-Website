const renderTestPage = (req, res) => {
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

}

module.exports = {
    renderTestPage
}