
var
    eshterak = require('../model/eshterak'),
    crypto = require('crypto'),
    Sherkat = require('../model/sherkatha');

var sherrkatcontroller = {};

sherrkatcontroller.save =async function(req, res) {
    var randomstring = Math.random().toString(36).slice(-8);
    var md5 = crypto.createHash('md5');
    md5 = md5.update(randomstring).digest('hex');
    var sabtkind=req.body.sabtkind;

    if(sabtkind=="register")
        await Sherkat.find({sabtno: req.body.shomaresabt}).then(async function (res1){
            if(res1.length==0){
                var Sherkatsave = new Sherkat(
                    {
                        sabtno: req.body.shomaresabt,
                        sherkatname: req.body.sherkatname,
                        modirname: req.body.modirname,
                        password:md5,
                        address: req.body.address,
                        phone: req.body.phone,
                        eshteraktype: "نامحدود",
                        karbarlimit: 1,
                        teknesianlimit: 1
                    });
                Sherkatsave.save(function (err) {
                    if(err)
                        eshterak.find({}).then(async function (res2){
                        res.render('sherkat_add', {
                            message:{
                                kind:"alert-danger",
                                content:"خطایی در ثبت رخ داده است."
                            },
                            eshteraks:res2,
                            csrfToken: req.csrfToken(),
                            activePage: {
                                isAuthenticated:req.isAuthenticated(),
                                sherkat_add: true,
                                title:'ثبت شرکت همکار'
                            }
                        });
                        });
                    res.redirect('sherkat_list?message=successadd');

                });

            }
            else
            {
                var all=await eshterak.find({}).then(async function (res2){
                    res.render('sherkat_add', {message:{kind:"alert-danger",content:"شماره ثبت تکراری می باشد."}, eshteraks:res2, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sherkat_add: true, title:'ثبت شرکت همکار'} });

                });
            }

        });
    else if(sabtkind=="update")
    {
        Sherkat.findOneAndUpdate(req.body.sabtno,req.body,function (err) {
            if(err)
                console.log(err);
            res.redirect('sherkat_list?message=successedit');

        })

    }
};




sherrkatcontroller.get = async (req, res) => {

        await eshterak.find({}).then(async function (res2){
            if(req.query.shid)

                await Sherkat.findOne({sabtno:req.query.shid}).then(async function (res3) {

            res.render('sherkat_add', {
                sherkat:res3,
                eshteraks: res2,
                csrfToken: req.csrfToken(),
                activePage: {isAuthenticated: req.isAuthenticated(), sherkat_add: true, title: 'ثبت شرکت همکار'}
            });
        });
            else
                res.render('sherkat_add', {
                    eshteraks: res2,
                    csrfToken: req.csrfToken(),
                    activePage: {isAuthenticated: req.isAuthenticated(), sherkat_add: true, title: 'ثبت شرکت همکار'}
                });
    });



};



sherrkatcontroller.post =async (req, res) => {
    var randomstring = Math.random().toString(36).slice(-8);
    var md5 = crypto.createHash('md5');
    md5 = md5.update(randomstring).digest('hex');

    var Sherkatsave = new Sherkat(
            {
                sabtno: req.body.shomaresabt,
                sherkatname: req.body.sherkatname,
                modirname: req.body.modirname,
                password:md5,
                address: req.body.address,
                phone: req.body.phone,
                eshteraktype: "نامحدود",
                karbarlimit: 1,
                teknesianlimit: 1
            });
    Sherkatsave.save(function(err) {
            if(err) {
                console.log(err);
                res.render('sherkat_add', {eshteraks:res2, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sherkat_add: true, title:'ثبت شرکت همکار'} });
            } else {
                console.log("Successfully created an employee.");
                res.render('sherkat_add', {eshteraks:res2, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sherkat_add: true, title:'ثبت شرکت همکار'} });
            }
        });

};




module.exports = sherrkatcontroller;
