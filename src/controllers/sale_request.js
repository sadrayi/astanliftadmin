exports.get = (req, res) => {
    res.render('sale_request', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sale_request: true, title:'درخواست های خرید آسانسور'} });
};
exports.post = (req, res) => {
    res.render('sale_request', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sale_request: true, title:'درخواست های خرید آسانسور'} });
};
