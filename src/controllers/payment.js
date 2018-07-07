var walletModel=require('../model/wallet');
var requestModel=require('../model/request');
var factorModel=require('../model/factor');

exports.get = async(req, res) => {
    var teknesian;
    await teknesianModel.find({}).then(async function (res2) {
    teknesian=res2;
    });
        await requestModel.findOne({_id:req.query.id}).then(async function (res2) {
        await contractModel.findOne({phone:res2.phone,contractenddate:{
                $gte: new Date()
            }}).then(async function (eshterakstatus) {
                if(eshterakstatus!==null)
                res2.eshterakstatus=eshterakstatus._id;
                else
                res2.eshterakstatus=null;
                if(res2!==null)
                res.render('tamirform_add', {
                    id:req.query.id,
                    request:res2,
                    teknesian:teknesian,
                    csrfToken: req.csrfToken(),
                    activePage: {isAuthenticated: req.isAuthenticated(), tamirform_add: true, title: 'ثبت فاکتور'}
                });
            else
                res.render('tamirform_add', {
                    id:req.query.id,
                    csrfToken: req.csrfToken(),
                    teknesian:teknesian,
                    activePage: {isAuthenticated: req.isAuthenticated(), tamirform_add: true, title: 'ثبت فاکتور'}
                });
        });
    });
};
exports.post = async(req, res) => {
    var body= req.body;

    var walletSave=new walletModel({
        payreciever:req.body.paysender ,
        factorid:req.body.factorid,
        paykindtext:req.body.kind,
        paykind:'bardasht',
        payamount:req.body.payamount,
        paydate:req.body.paydate,
        paycomment:req.body.paycomment,
    });
    var walletSave1=new walletModel({
        payreciever:req.body.payreciever,
        factorid:req.body.factorid,
        paykindtext:req.body.kind,
        paykind:'variz',
        payamount:req.body.payamount,
        paydate:req.body.paydate,
        paycomment:req.body.paycomment,
    });
    await walletSave.save(async function (err,walletresponse1) {
        await walletSave1.save(async function (err,walletresponse) {
            if(err)
            console.log(err);
        factorModel.findOneAndUpdate({requestid:req.body.requestid, status: { $ne: 'cancelled' }}, {$set: {status:"paid",walletid:walletresponse._id}}, function (err) {
            if(err)
                console.log(err);
            requestModel.findOneAndUpdate({_id: req.body.requestid}, {$set: {status: "paid"}}, function (err,request) {
                if (err)
                    console.log(err);
                switch(request.kind){
                    case 'درخواست مشاوره و نظرات':
                        redirecturl='nezarat_invoice';
                        break;
                    case 'درخواست استاندارد':
                        redirecturl='standard_invoice';
                        break;
                    case 'عقد قرارداد سرویس ماهیانه':
                        redirecturl='contract_invoice';
                        break;
                    case 'درخواست تعمیر':
                        redirecturl='repair_invoice';
                        break;
                    case 'درخواست پشتیبانی اداری':
                        redirecturl='poshtibani_invoice';
                        break;
                    case 'فروش آسانسور':
                        redirecturl='asansorsale_invoice';
                        break;
                }
                req.session.message='successpaied';
                res.redirect(redirecturl);
            });
        });
        });
    })
};
