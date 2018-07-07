exports.get = (req, res) => {
    res.render('products/product_category', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), product_category: true, title:'لیست دسته بندی ها'} });
};
