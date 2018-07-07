exports.get = (req, res) => {
    res.render('contract_detail', {   csrfToken: req.csrfToken(),  activePage: {isAuthenticated:req.isAuthenticated(), contract_detail: true, title:'جزئیات قرارداد '} });
};
exports.post = (req, res) => {
    res.render('contract_detail', {   csrfToken: req.csrfToken(),  activePage: {isAuthenticated:req.isAuthenticated(), contract_detail: true, title:'جزئیات قرارداد '} });
};
