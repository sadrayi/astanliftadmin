exports.get = (req, res) => {
    res.render('operator_add', {   csrfToken: req.csrfToken(),  activePage: {isAuthenticated:req.isAuthenticated(), operator_add: true, title:'افزودن اپراتور'} });
};
exports.post = (req, res) => {
    res.render('operator_add', {   csrfToken: req.csrfToken(),  activePage: {isAuthenticated:req.isAuthenticated(), operator_add: true, title:'افزودن اپراتور'} });
};
