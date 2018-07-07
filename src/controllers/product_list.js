Category = require('../model/category');
productModel = require('../model/product');

exports.get = async (req, res) => {
    await productModel.find({}).then(async function (res3) {
        res.render('products/product_list', {
            products:res3,
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), product_add: true, title: 'لیست محصولات'}
        });
    });
};
