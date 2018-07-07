var User = require('../model/user');
var jalaali = require('jalaali-js');

exports.get =async (req, res) => {
    var body=req.body;
    console.log(body);
    if(req.query.shid)
        await User.findOne({phone:req.query.shid}).then(async function (res3) {
            if(typeof res3 !== 'undefined')
            res.render('user_add', {sherkat:res3,   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),user_add: true, title:'افزودن کاربر'} });
            else
                res.render('user_add', {   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),user_add: true, title:'افزودن کاربر'} });

        });
    else
        res.render('user_add', {   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),user_add: true, title:'افزودن کاربر'} });

};
exports.post = async (req, res) => {
    var body = req.body;
    console.log(body);
    var charCodeZero = '۰'.charCodeAt(0);
    persianDate=req.body.birthdate.split('/');
    for(i=0;i<persianDate.length;i++){
        persianDate[i] = parseInt( persianDate[i].replace(/[۰-۹]/g, function (w) {
            return w.charCodeAt(0) - charCodeZero;
        }));
    }
    let GeorgDate =jalaali.toGregorian(persianDate[0], persianDate[1], persianDate[2]);
    let birthdate=GeorgDate.gy+"/"+GeorgDate.gm+"/"+GeorgDate.gd;
        if(req.body.sabtkind==="register")
            await User.find({phone: req.body.phone}).then(async function (res1){
                if(res1.length===0){
                    var Usersave = new User(
                        {
                            phone: req.body.phone,
                            name: req.body.name,
                            birthdate: birthdate,
                            email: req.body.email,
                        });
                    Usersave.save(function (err) {
                        if(err)
                            res.render('user_add' ,{
                                message:{
                                    kind:"alert-danger",
                                    content:"خطایی در ثبت رخ داده است."
                                },
                                csrfToken: req.csrfToken(),
                                activePage: {
                                    isAuthenticated:req.isAuthenticated(),
                                    sherkat_add: true,
                                    title:'ثبت  کاربر'
                                }
                            });
                        res.redirect('user_list?message=successadd');

                    });

                }
                else
                {
                    res.render('user_add', {message:{kind:"alert-danger",content:"شماره همراه  تکراری می باشد."}, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sherkat_add: true, title:'ثبت شرکت همکار'} });

                }

            });
        else if(req.body.sabtkind==="update")
        {
            await User.find({phone: req.body.phone}).then(async function (res1) {
                if (res1.length === 0) {

                    var charCodeZero = '۰'.charCodeAt(0);
                    persianDate = req.body.birthdate.split('/');
                    for (i = 0; i < persianDate.length; i++) {
                        persianDate[i] = parseInt(persianDate[i].replace(/[۰-۹]/g, function (w) {
                            return w.charCodeAt(0) - charCodeZero;
                        }));
                    }
                    let GeorgDate = jalaali.toGregorian(persianDate[0], persianDate[1], persianDate[2]);
                    let birthdate = GeorgDate.gy + "/" + GeorgDate.gm + "/" + GeorgDate.gd;
                    req.body.birthdate = birthdate;
                    User.findOneAndUpdate(req.body.phone, req.body, function (err) {
                        if (err)
                            console.log(err);
                        res.redirect('user_list?message=successedit');

                    })
                }
                else {
                    res.render('user_add', {
                        sherkat:req.body,
                        message: {
                            kind: "alert-danger",
                            content: "شماره همراه  تکراری می باشد."
                        },
                        csrfToken: req.csrfToken(),
                        activePage: {isAuthenticated: req.isAuthenticated(), sherkat_add: true, title: 'ثبت  کاربر'}
                    });

                }
            });
        }


};
