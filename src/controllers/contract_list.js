var requestModel = require("../model/request");
var contractModel = require("../model/contract");
var factorModel = require("../model/factor");
exports.get =async (req, res) => {
    switch (req.session.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "ثبت نام با موفقیت انجام شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "شرکت با موفقیت ویرایش شد.";
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
    await requestModel.find({kind:'عقد قرارداد سرویس ماهیانه'}).then(async function (res2) {
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
            activePage: {isAuthenticated: req.isAuthenticated(), sherkat_list: true, title: 'لیست درخواست های عقد قرارداد سرویس ماهیانه'}
        });
    });
};
