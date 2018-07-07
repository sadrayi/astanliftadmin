exports.get = (req, res) => {
    res.render('login', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), calendar: true, title:'تقویم کاری مجید صدرایی'} });
};
exports.post = (req, res) => {
    res.render('calendar', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), calendar: true, title:'تقویم کاری مجید صدرایی'} });
};
