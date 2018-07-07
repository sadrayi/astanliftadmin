Category = require('../model/category');

exports.get = async (req, res) => {
    await Category.find({}).then(async function (res3) {

        res.render('category_list', {sherkat:res3,   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),category_add: true, title:'افزودن دسته بندی'} });

    });};
exports.post = (req, res) => {
    res.render('category_list', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), category_list: true, title:'لیست دسته بندی محصولات'} });
};
