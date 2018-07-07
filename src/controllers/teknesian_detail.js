exports.get = (req, res) => {
    res.render('teknesian_detail', {   csrfToken: req.csrfToken(),  activePage: {isAuthenticated:req.isAuthenticated(), teknesian_detail: true, title:'مشخصات تکنسین'} });
};
exports.post = (req, res) => {
    res.render('teknesian_detail', {   csrfToken: req.csrfToken(),  activePage: {isAuthenticated:req.isAuthenticated(),teknesian_detail: true, title:'مشخصات تکنسین'} });
};
