Category = require('../model/category');
productModel = require('../model/product');

exports.get = async (req, res) => {
    await productModel.findOne({_id:req.query.shid}).then(async function (res3) {
        res.render('products/product_detail', {
            product:res3,
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), product_add: true, title: 'جزئیات محصول'}
        });
    });
};
