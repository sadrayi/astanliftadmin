Category = require('../model/category');
productModel = require('../model/product');

exports.get = async (req, res) => {
    if(req.query.shid)
    {
        await productModel.findOne({_id:req.query.shid}).then(async function (res2) {
            await Category.find({}).then(async function (res3) {
                res.render('products/product_add', {
                    sherkat:res2,
                    cats: res3,
                    csrfToken: req.csrfToken(),
                    activePage: {isAuthenticated: req.isAuthenticated(), product_add: true, title: 'افزودن محصول'}
                });
            });
        });
    }
    else
    await Category.find({}).then(async function (res3) {
        res.render('products/product_add', {
            cats:res3,
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), product_add: true, title: 'افزودن محصول'}
        });
    });
};

exports.post = async (req, res) => {
    var body = req.body;
    console.log(body);
    if (req.files.product_pic){
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.product_pic;
        let extension =sampleFile.name.split(".")[1];
        // Use the mv() method to place the file somewhere on your server
        let picname="pro_"+Date.now()+"."+extension;
        await sampleFile.mv('./public/images/product_pic/'+picname,async function (err) {
            if (err)
                return res.status(500).send(err);
            else {
                req.body.product_pic=picname;
                if(req.body.sabtkind==="register"){
                    var productModelsave = new productModel(req.body);
                    productModelsave.save(function (err) {
                        if(err)
                            res.render('product_add', {
                                message:{
                                    kind:"alert-danger",
                                    content:"خطایی در ثبت رخ داده است."
                                },
                                csrfToken: req.csrfToken(),
                                activePage: {
                                    isAuthenticated:req.isAuthenticated(),
                                    sherkat_add: true,
                                    title:'ثبت شرکت همکار'
                                }
                            });
                        res.redirect('product_list?message=successadd');

                    });

                }

                else if(req.body.sabtkind==="update")
                {
                    req.body.product_pic=picname;
                    productModel.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                        if(err)
                            console.log(err);
                        res.redirect('product_list?message=successedit');

                    })

                }

            }
        });
    }
    else
    {
        if(req.body.sabtkind==="register"){
            var productModelsave = new productModel(req.body);
            productModelsave.save(function (err) {
                if(err)
                    res.render('product_add', {
                        message:{
                            kind:"alert-danger",
                            content:"خطایی در ثبت رخ داده است."
                        },
                        csrfToken: req.csrfToken(),
                        activePage: {
                            isAuthenticated:req.isAuthenticated(),
                            sherkat_add: true,
                            title:'ثبت شرکت همکار'
                        }
                    });
                res.redirect('product_list?message=successadd');

            });

        }


        else if(req.body.sabtkind=="update")
        {
            productModel.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                if(err)
                    console.log(err);
                res.redirect('product_list?message=successedit');

            })

        }

    }
};
