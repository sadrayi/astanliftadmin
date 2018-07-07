var requestModel = require("../model/request");
var contractModel = require("../model/contract");
var factorModel = require("../model/factor");
exports.get =async (req, res) => {
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "ثبت درخواست با موفقیت انجام شد.";
            break;
            case "errorcancell":
            var message = "alert-success";
            var content = "لغو درخواست ناموفق بود.";
            break;
            case "successcancell":
            var message = "alert-danger";
            var content = "لغو درخواست با موفقیت انجام شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "درخواست با موفقیت ویرایش شد.";
            break;
        case "successaddfactor":
            var message = "alert-success";
            var content = "فاکتور با موفقیت ثبت شد.";
            break;
        case "successaddtamir":
            var message = "alert-success";
            var content = "فرم تعمیر با موفقیت ثبت شد.";
            break;
    }
    req.session.message="";
    await requestModel.find({}).then(async function (res2) {
        for(i=0;i<res2.length;i++){
        await contractModel.find({phone:res2[i].phone,contractenddate:{
                $gte: new Date()
    }}).then(async function (eshterakstatus) {
    if(eshterakstatus.length>0)
        res2[i].eshterakstatus="1";
    else
        res2[i].eshterakstatus="0";
        });
            await factorModel.findOne({requestid:res2[i]._id},async function (err,factorresponse) {
                if(factorresponse !== null) {
                    res2[i].factorid=factorresponse._id;
                    res2[i].factoramount=factorresponse.factorsum;

                }
                else
                    res2[i].factorid="0";
            });
        }
        res.render('./requests/request_list', {
            sherkatlist:res2,
            message: {kind: message, content: content},
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), sherkat_list: true, title: 'لیست درخواست ها '}
        });
    });
};

exports.cancell =async (req, res) => {
    await requestModel.findOneAndUpdate({_id:req.body.requestid},{status:'cancelled'},async function (err,reqs) {
        var redirecturl;
        switch(reqs.kind){
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
        if(err)
        res.redirect(redirecturl+'?message=errorcancell');
        else {
            await factorModel.findOneAndUpdate({requestid:req.body.requestid},{status:'cancelled'},async function (err,res2) {
                res.redirect(redirecturl+'?message=successcancell');
            });
        }

    });
};
