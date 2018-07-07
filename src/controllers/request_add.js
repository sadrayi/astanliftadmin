/*
کنترل شماره همراه یا قرارداد
دریافت اطلاعات آدرسی و نام فرد بر اساس شماره قرارداد
غیرفعال کردن فیلد نام و آدرس بر اساس انتخاب
ثبت مشرتی در صورت عدم
انتخاب تکنسین اتوکامپلیت
بستن آدرس سایر در صورت ورود شماره قرارداد


 */
Teknesian = require('../model/teknesian');
userModel = require('../model/user');
Address = require('../model/address');
requestModel = require('../model/request');
contractModel = require('../model/contract');
var http = require('http'),
    Stream = require('stream').Transform,
    fs = require('fs');
exports.get =async (req, res) => {
    display(req, res,null);
};
exports.nezarat =async (req, res) => {
    display(req, res,'درخواست مشاوره و نظرات');
};
exports.standard =async (req, res) => {
    display(req, res,'درخواست استاندارد');
};
exports.contract =async (req, res) => {
    display(req, res,'عقد قرارداد سرویس ماهیانه');
};
exports.repair =async (req, res) => {
    display(req, res,'درخواست تعمیر');
};
exports.poshtibani =async (req, res) => {
    display(req, res,'درخواست پشتیبانی اداری');
};
exports.asansorsale =async (req, res) => {
    display(req, res,'فروش آسانسور');
};
var display=async function(req,res,kind){
    await Teknesian.find({}).then(async function (teknesian) {

        if (req.query.shid)
            await requestModel.findOne({_id: req.query.shid}).then(async function (res3) {
                if (typeof res3 !== 'undefined')
                    res.render('requests/request_add', {
                        kind:kind,
                        teknesian:teknesian,
                        sherkat: res3,
                        csrfToken: req.csrfToken(),
                        activePage: {isAuthenticated: req.isAuthenticated(), user_add: true, title: 'افزودن درخواست'}
                    });
                else
                    res.render('requests/request_add', {
                        teknesian:teknesian,
                        kind:kind,
                        csrfToken: req.csrfToken(),
                        activePage: {isAuthenticated: req.isAuthenticated(), user_add: true, title: 'افزودن درخواست'}
                    });

            });
        else
            res.render('requests/request_add', {
                teknesian:teknesian,
                kind:kind,
                csrfToken: req.csrfToken(),
                activePage: {isAuthenticated: req.isAuthenticated(), user_add: true, title: 'افزودن درخواست'}
            });
    });
};
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

exports.post = async (req, res) => {

    switch(req.body.kind){
        case 'درخواست مشاوره و نظرات':
            redirecturl='nezarat_list';
            break;
        case 'درخواست استاندارد':
            redirecturl='standard_list';
            break;
        case 'عقد قرارداد سرویس ماهیانه':
            redirecturl='contract_list';
            break;
        case 'درخواست تعمیر':
            redirecturl='repair_list';
            break;
        case 'درخواست پشتیبانی اداری':
            redirecturl='poshtibani_list';
            break;
        case 'فروش آسانسور':
            redirecturl='asansorsale_list';
            break;
    }
    if(req.body.savekind==='save') {
        var body = req.body;
        body.status = 'bazdid';
        var addressid;
        if (body.userid === "0") {
            var userSave = new userModel(
                {
                    phone: req.body.phone,
                    name: req.body.requester,
                    birthdate: Date.now(),
                    email: "a@a.a",
                });
            userSave.save();
        }
        if (req.body.sabtkind === "register") {
            address_picname='./public/images/address_pic/'+req.body.phone+Date.now()+'.png';
            var url='http://api.cedarmaps.com/v1/static/light/'+req.body.latLng+',14/600x400@2x?access_token=48bf6ec91f7f5ded1bd11d005e155a9c0e0067bc&markers=marker-default|'+req.body.latLng;
            http.request(url, function(response) {
                var data = new Stream();

                response.on('data', function(chunk) {
                    data.push(chunk);
                });

                response.on('end', function() {
                    fs.writeFileSync(address_picname, data.read());
                });
            }).end();
            if (body.addressid === "0") {
                var addressSave = new Address(
                    {
                        phone: body.phone,
                        city: body.city,
                        zone: body.zone,
                        address_pic: address_picname,
                        ostan: body.ostan,
                        latlng:body.latLng,
                        address: body.address,
                    });
                addressSave.save(async function (err, address) {
                    if (err) {
                        await Teknesian.find({}).then(async function (teknesian) {
                            res.render("requests/request_add", {
                                teknesian: teknesian,
                                message: {
                                    kind: "alert-danger",
                                    content: "خطایی در ثبت رخ داده است."
                                },
                                csrfToken: req.csrfToken(),
                                activePage: {
                                    isAuthenticated: req.isAuthenticated(),
                                    request_add: true,
                                    title: 'ثبت  درخواست'
                                }
                            });
                            return;
                        });
                    }
                    await contractModel.findOne({phone:req.body.phone,contractenddate:{
                            $gte: new Date()
                        }},async function (eshterakstatus) {
                        var eshterakstatus;
                        if(eshterakstatus!==null)
                            eshterakstatus="مشترک";
                        else
                            eshterakstatus="غیرمشترک";
                    var requestSave = new requestModel(
                        {
                            phone: body.phone,
                            kind: body.kind,
                            requester: body.requester,
                            city: body.city,
                            ostan: body.ostan,
                            address_pic: address_picname,
                            eshterakstatus: eshterakstatus,
                            requestdate: body.requestdate,
                            status: 'bazdid',
                            latlng:body.latLng,
                            addressid: address._id,
                            zone: body.zone,
                            address: body.address,
                            teknesiankind: body.teknesiankind,
                            teknesian: body.teknesian,
                            comment: body.comment,
                        });
                    requestSave.save(async function (err) {
                        if (err)
                            await Teknesian.find({}).then(async function (teknesian) {

                                res.render("requests/request_add", {
                                    teknesian: teknesian,
                                    message: {
                                        kind: "alert-danger",
                                        content: "خطایی در ثبت رخ داده است."
                                    },
                                    csrfToken: req.csrfToken(),
                                    activePage: {
                                        isAuthenticated: req.isAuthenticated(),
                                        request_add: true,
                                        title: 'ثبت  درخواست'
                                    }
                                });
                            });
                        res.redirect(redirecturl + '?message=successadd');
                    });
                });});
            }
            else {
                await contractModel.findOne({phone:req.body.phone,contractenddate:{
                        $gte: new Date()
                    }},async function (eshterakstatus) {
                    var eshterakstatus;
                    if(eshterakstatus!==null)
                        eshterakstatus="مشترک";
                    else
                        eshterakstatus="غیرمشترک";
                var requestSave = new requestModel(body);
                    requestSave.eshterakstatus=eshterakstatus;
                requestSave.save(async function (err) {
                    if (err)
                        await Teknesian.find({}).then(async function (teknesian) {

                            res.render("requests/request_add", {
                                teknesian: teknesian,
                                message: {
                                    kind: "alert-danger",
                                    content: "خطایی در ثبت رخ داده است."
                                },
                                csrfToken: req.csrfToken(),
                                activePage: {
                                    isAuthenticated: req.isAuthenticated(),
                                    request_add: true,
                                    title: 'ثبت  درخواست'
                                }
                            });
                        });
                    res.redirect(redirecturl + '?message=successadd');
                });});
            }
        }
        else if (req.body.sabtkind === "update") {
            var addressid;

            if (body.addressid === "0") {
                address_picname='./public/images/address_pic/'+req.body.phone+Date.now()+'.png';
                var url='http://api.cedarmaps.com/v1/static/light/'+req.body.latLng+',14/600x400@2x?access_token=48bf6ec91f7f5ded1bd11d005e155a9c0e0067bc&markers=marker-default|'+req.body.latLng;
                http.request(url, function(response) {
                    var data = new Stream();

                    response.on('data', function(chunk) {
                        data.push(chunk);
                    });

                    response.on('end', function() {
                        fs.writeFileSync(address_picname, data.read());
                    });
                }).end();
                var addressSave = new Address(
                    {
                        phone: body.phone,
                        city: body.city,
                        ostan: body.ostan,
                        address_pic:address_picname,
                        latlng:body.latlng,
                        zone: body.zone,
                        address: body.address,
                    });
                addressSave.save((async function (err, addressids) {
                    if (err)
                        await Teknesian.find({}).then(async function (teknesian) {

                            res.render("requests/request_add", {
                                teknesian: teknesian,
                                message: {
                                    kind: "alert-danger",
                                    content: "خطایی در ثبت رخ داده است."
                                },
                                csrfToken: req.csrfToken(),
                                activePage: {
                                    isAuthenticated: req.isAuthenticated(),
                                    request_add: true,
                                    title: 'ثبت  درخواست'
                                }
                            });
                        });
                    var requestsave = {
                        phone: req.body.phone,
                        kind: req.body.kind,
                        requester: req.body.requester,
                        requestdate: req.body.requestdate,
                        city: req.body.city,
                        ostan: req.body.ostan,
                        latlng:body.latLng,
                        address_pic: address_picname,
                        addressid: req.body.addressid,
                        zone: req.body.zone,
                        address: req.body.address,
                        teknesiankind: req.body.teknesiankind,
                        teknesian: req.body.teknesian,
                        comment: req.body.comment,
                    }
                    requestsave.addressid = addressids._id;
                    requestModel.findOneAndUpdate({_id: req.body.id}, requestsave, function (err) {
                        if (err)
                            console.log(err);
                        res.redirect(redirecturl + '?message=successedit');
                    });
                }));
            }
            else
                requestModel.findOneAndUpdate({_id: req.body.id}, requestsave, function (err) {
                    if (err)
                        console.log(err);
                    res.redirect(redirecturl + '?message=successedit');

                })
        }

    }
    else {
        res.redirect(redirecturl);

    }
};
