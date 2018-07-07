Teknesian = require('../model/teknesian');
var jalaali = require('jalaali-js');

exports.get =async (req, res) => {
    var body=req.body;
    console.log(body);
    if(req.query.shid)
    await Teknesian.findOne({codemeli:req.query.shid}).then(async function (res3) {

        res.render('teknesian_add', {sherkat:res3,   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),teknesian_add: true, title:'افزودن تکنسین'} });

    });
    else
        res.render('teknesian_add', {   csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(),teknesian_add: true, title:'افزودن تکنسین'} });

};
exports.post = async (req, res) => {
    var body = req.body;
    console.log(body);            var charCodeZero = '۰'.charCodeAt(0);
    persianDate=req.body.birthdate.split('/');
    for(i=0;i<persianDate.length;i++){
        persianDate[i] = parseInt( persianDate[i].replace(/[۰-۹]/g, function (w) {
            return w.charCodeAt(0) - charCodeZero;
        }));
    }
    let GeorgDate =jalaali.toGregorian(persianDate[0], persianDate[1], persianDate[2]);
    let birthdate=GeorgDate.gy+"/"+GeorgDate.gm+"/"+GeorgDate.gd;
    if (req.files.profile_pic){

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.profile_pic;
    let extension =sampleFile.name.split(".")[1];
    // Use the mv() method to place the file somewhere on your server
        let picname=req.body.codemeli+"_"+Date.now()+"."+extension;
    sampleFile.mv('./public/images/teknesian_profile/'+picname,async function (err) {
        if (err)
            return res.status(500).send(err);
        else {
            if(req.body.sabtkind=="register")
                await Teknesian.find({codemeli: req.body.codemeli}).then(async function (res1){
                if(res1.length==0){
                    var Teknesiansave = new Teknesian(
                        {
                            codemeli: req.body.codemeli,
                            lastname:req.body.lastname,
                            gender: req.body.gender,
                            address: req.body.address,
                            phone: req.body.phone,
                            profile_pic:picname,
                            birthdate: birthdate,
                            type: req.body.type,
                            sherkatsabtno:"1",
                            about: req.body.about,
                        });
                    Teknesiansave.save(function (err) {
                        if(err)
                                res.render('teknesian_add', {
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
                        res.redirect('teknesian_list?message=successadd');

                    });

                }
                else
                {
                        res.render('teknesian_add', {message:{kind:"alert-danger",content:"کدملی  تکراری می باشد."}, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sherkat_add: true, title:'ثبت شرکت همکار'} });

                }

            });
        else if(req.body.sabtkind=="update")
            {
                var charCodeZero = '۰'.charCodeAt(0);
                persianDate=req.body.birthdate.split('/');
                for(i=0;i<persianDate.length;i++){
                    persianDate[i] = parseInt( persianDate[i].replace(/[۰-۹]/g, function (w) {
                        return w.charCodeAt(0) - charCodeZero;
                    }));
                }
                let GeorgDate =jalaali.toGregorian(persianDate[0], persianDate[1], persianDate[2]);
                let birthdate=GeorgDate.gy+"/"+GeorgDate.gm+"/"+GeorgDate.gd;
                req.body.birthdate=birthdate;
                req.body.profile_pic=picname;
                Teknesian.findOneAndUpdate(req.body.codemeli,req.body,function (err) {
                    if(err)
                        console.log(err);
                    res.redirect('teknesian_list?message=successedit');

                })

            }

        }
    });
    }
    else
    {
        if(req.body.sabtkind=="register")
            await Teknesian.find({codemeli: req.body.codemeli}).then(async function (res1){
                if(res1.length==0){
                    var Teknesiansave = new Teknesian(
                        {
                            codemeli: req.body.codemeli,
                            fisrtname: req.body.firstname,
                            lastname:req.body.lastname,
                            gender: req.body.gender,
                            address: req.body.address,
                            phone: req.body.phone,
                            birthdate: birthdate,
                            type: req.body.type,
                            sherkatsabtno:"1",
                            about: req.body.about,
                        });
                    Teknesiansave.save(function (err) {
                        if(err)
                            res.render('teknesian_add', {
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
                        res.redirect('teknesian_list?message=successadd');

                    });

                }
                else
                {
                    res.render('teknesian_add', {message:{kind:"alert-danger",content:"کدملی  تکراری می باشد."}, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), sherkat_add: true, title:'ثبت شرکت همکار'} });

                }

            });
        else if(req.body.sabtkind=="update")
        {
            var charCodeZero = '۰'.charCodeAt(0);
            persianDate=req.body.birthdate.split('/');
            for(i=0;i<persianDate.length;i++){
                persianDate[i] = parseInt( persianDate[i].replace(/[۰-۹]/g, function (w) {
                    return w.charCodeAt(0) - charCodeZero;
                }));
            }
            let GeorgDate =jalaali.toGregorian(persianDate[0], persianDate[1], persianDate[2]);
            let birthdate=GeorgDate.gy+"/"+GeorgDate.gm+"/"+GeorgDate.gd;
            req.body.birthdate=birthdate;
            Teknesian.findOneAndUpdate(req.body.codemeli,req.body,function (err) {
                if(err)
                    console.log(err);
                res.redirect('teknesian_list?message=successedit');

            })

        }

    }
};
