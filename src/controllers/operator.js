exports.get = (req, res) => {
    res.render('operator_list', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), operator_list: true, title:'لیست اپراتورها'} });
};
exports.post = (req, res) => {
    res.render('operator_list', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), operator_list: true, title:'لیست اپراتورها'} });
};
