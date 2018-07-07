var requestModel=require('../model/request');
var factorModek=require('../model/factor');
var contractModel=require('../model/contract');
var teknesianModel=require('../model/teknesian');
var tamirModek=require('../model/tamirform');

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
    var factorSave=new factorModek({
        phone:  body.phone,
        requestid:  body.requestid,
        requester:  body.requester,
        requestkind:"درخواست تعمیر",
        arzeshafzude:  body.arzeshafzude,
        title: body.title,
        percost:body.percost,
        quantity:body.quantity,
        comment:body.comment,
        factorcount:body.factorcount,
        factorsum:body.factorsum,
        factormaliat:body.factormaliat,

    });
    var tamirSave=new tamirModek({
        phone:  body.phone,
        requestid:  body.requestid,
        requester:  body.requester,
        arzeshafzude:  body.arzeshafzude,
        address:  body.address,
        tamirkind:  body.address,
        eghdamat:  body.eghdamat,
        teknesianid:  body.teknesian,
        title: body.title,
        percost:body.percost,
        quantity:body.quantity,
        comment:body.comment,
        factorcount:body.factorcount,
        factorsum:body.factorsum,
        factormaliat:body.factormaliat,

    });
    await tamirSave.save().then(async function (err) {
        if(err)
            console.log(err);
        await factorSave.save().then(function (err) {
            if(err)
                console.log(err);
            requestModel.findOneAndUpdate({_id: req.body.requestid}, {$set: {status: "factoradded"}}, function (err) {
                if (err)
                    console.log(err);
                req.session.message='successaddtamir';
                res.redirect('repair_list');
            });
        });
    })
};
