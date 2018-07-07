Category = require('../model/category');
var jalaali = require('jalaali-js');

exports.get =async (req, res) => {
    var body=req.body;
    console.log(body);
    if(req.query.shid)
    await Category.findOne({_id:req.query.shid}).then(async function (res3) {

        res.render('category_add', {sherkat:res3,   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),category_add: true, title:'افزودن دسته بندی'} });

    });
    else
        res.render('category_add', {   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),category_add: true, title:'افزودن دسته بندی'} });

};
exports.post = async (req, res) => {
    var body = req.body;
    console.log(body);
    if (req.files.category_pic){

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.category_pic;
    let extension =sampleFile.name.split(".")[1];
    // Use the mv() method to place the file somewhere on your server
        let picname="cat_"+Date.now()+"."+extension;
    sampleFile.mv('./public/images/category_pic/'+picname,async function (err) {
        if (err)
            return res.status(500).send(err);
        else {
            if(req.body.sabtkind==="register"){
                    var Categorysave = new Category(
                        {
                            catname: req.body.catname,
                            category_pic: picname,
                            status:"0",
                        });
                    Categorysave.save(function (err) {
                        if(err)
                                res.render('category_add', {
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
                        res.redirect('category_list?message=successadd');

                    });

                }

        else if(req.body.sabtkind==="update")
            {
                req.body.category_pic=picname;
                Category.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                    if(err)
                        console.log(err);
                    res.redirect('category_list?message=successedit');

                })

            }

        }
    });
    }
    else
    {
        if(req.body.sabtkind==="register"){
            var Categorysave = new Category(
                {
                    catname: req.body.catname,
                    status:"0",
                });
                    Categorysave.save(function (err) {
                        if(err)
                            res.render('category_add', {
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
                        res.redirect('category_list?message=successadd');

                    });

                }


        else if(req.body.sabtkind=="update")
        {
            Category.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                if(err)
                    console.log(err);
                res.redirect('category_list?message=successedit');

            })

        }

    }
};
