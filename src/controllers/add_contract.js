var contractmodel=require('../model/contract');
var requestModel=require('../model/request');
var Teknesian=require('../model/teknesian');
var factorModel=require('../model/factor');
exports.get = async(req, res) => {
    var contracts=null
    if(typeof req.query.cid!=='undefined') {
        await contractmodel.findOne({_id: req.query.cid}, async function (err, contract) {
            if(!err)
                contracts=contract;
                contracts.savetype='update';
                contracts.contractid=req.query.cid;
        });
    }
    else
    if(typeof req.query.id!=='undefined') {
        await requestModel.findOne({_id: req.query.id}, async function (err, contract) {
            if(!err) {
                contracts = contract;
                contracts.requestid=contract._id;
                contracts.savetype='register';
            }
        });
    }
    await Teknesian.find({},async function (err,teknesian) {
        if( contracts!==null)
            res.render('contract_add', {
                teknesian:teknesian,
                contract:contracts,
                csrfToken: req.csrfToken(),
                activePage: {isAuthenticated: req.isAuthenticated(), contract_add: true, title: 'افزودن قرارداد'}
            });
        else
            res.render('contract_add', {
                teknesian:teknesian,
                csrfToken: req.csrfToken(),
                activePage: {isAuthenticated: req.isAuthenticated(), contract_add: true, title: 'افزودن قرارداد'}
            });
    });
};
exports.view = (req, res) => {
    res.render('contract_add', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), contract_add: true,contract_view: true, title:'افزودن قرارداد'} });
};
exports.post = async(req, res) => {
    var factorcount=0;
    switch(req.body.pishpardakhtkind){
        case 'ماهیانه':
            factorcount=12;
            break;
        case 'سه ماهه':
            factorcount=4;
            break;
        case 'شش ماهه':
            factorcount=2;
            break;
        case 'یکجا':
            factorcount=1;
            break;
    }
    var body=req.body;
    if(req.body.sabtkind==='register') {
        var year = new Date(req.body.contractduration);
        year.setTime(year.getTime() + 365 * 86400000);
        req.body.contractenddate = year;
        var contractsave = new contractmodel(req.body);
        contractsave.save(async function (err) {
            if (err)
                console.log(err);
            var perioddate = Math.round(365 / req.body.servicepersal);
            for (e = 0; e < req.body.servicepersal; e++) {
                var requestdate = new Date(req.body.firstservicedate);
                requestdate.setTime(requestdate.getTime() + ((perioddate * (e + 1)) * 86400000));
                var requestSave = new requestModel(
                    {
                        phone: body.phone,
                        kind: 'بازدید دوره ای',
                        requester: body.requester,
                        city: body.city,
                        requestdate: requestdate,
                        status: 'bazdid',
                        addressid: body.address._id,
                        zone: body.zone,
                        ostan: body.ostan,
                        latlng:body.latLng,
                        address: body.address,
                        teknesiankind: body.teknesiankind,
                        teknesian: body.teknesian,
                        comment: body.comment,
                    });
                requestSave.save();
            }
            var mnthlycost = req.body.monthlycost * factorcount;
            var maliat = 0;
            if (typeof req.body.arzeshafzude !== 'undefined')
                if (req.body.arzeshafzude === '1')
                    maliat = mnthlycost * 9 / 100;
            var total = maliat + mnthlycost;
            for (r = 0; r < factorcount; r++) {
                if (r === 0)
                    requestid = body.requestid;
                else
                    requestid = '0';
                var factordate = new Date(req.body.contractduration);
                factordate.setTime(factordate.getTime() + (((12 / factorcount) * (r * 30)) * 86400000));
                var factorSave = new factorModel({
                    phone: body.phone,
                    requestid: requestid,
                    requester: body.requester,
                    requestkind: 'عقد قرارداد سرویس ماهیانه',
                    arzeshafzude: body.arzeshafzude,
                    title: ['قسط قرارداد سرویس ماهیانه'],
                    percost: [(mnthlycost).toString()],
                    quantity: ["1"],
                    comment: "قسط شماره" + (r + 1),
                    factorcount: "1",
                    factordate: factordate,
                    factorsum: (total).toString(),
                    factormaliat: maliat,

                });
                await factorSave.save()
            }
            requestModel.findOneAndUpdate({_id: req.body.requestid}, {$set: {status: "factoradded"}}, function (err) {
                if (err)
                    console.log(err);

            });
            res.redirect('contracts?message=successedit');

        })
    }
    else
    if(req.body.sabtkind==='update') {
        contractmodel.findOneAndUpdate({_id:req.body.contractid},req.body, function (err) {
            if(err)
                console.log(err);
            res.redirect('contracts?message=successedit');

        });
    }
    };
