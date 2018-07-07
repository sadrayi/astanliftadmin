var factorModel=require('../model/factor');
var requestModel=require('../model/request');
exports.get = async(req, res) => {
    display(req,res,null);
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
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "ثبت درخواست با موفقیت انجام شد.";
            break;
        case "errorcancell":
            var message = "alert-success";
            var content = "لغو فاکتور ناموفق بود.";
            break;
        case "successcancell":
            var message = "alert-danger";
            var content = "لغو فاکتور با موفقیت انجام شد.";
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
        case "successpaied":
            var message = "alert-success";
            var content = "پرداخت با موفقیت ثبت شد.";
            break;
    }
    if (kind!==null)
        title='ی '+kind;
    else
        title="";
    await factorModel.find({requestkind:kind},function(err,factorlist) {
        console.log(factorlist.length)
        res.render('invoice_list', {
            factorlist:factorlist,
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), invoice_list: true, title: 'لیست فاکتور ها'+title}
        });
    });
};

exports.post = (req, res) => {
    res.render('invoice_list', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), invoice_list: true, title:'لیست فاکتور ها'} });
};
exports.cancell =async (req, res) => {
    await factorModel.findOneAndUpdate({_id:req.body._id},{status:'cancelled'},async function (err,res2) {

        var redirecturl;
        switch(res2.requestkind){
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
        if(err)
            res.redirect(redirecturl+'?message=errorcancell');
        else {
            if(typeof res2.requestid!=='undefined') {
                if (res2.requestid !== null)
                    if (res2.requestid !== '0')
                        await requestModel.findOneAndUpdate({_id: res2.requestid}, {status: 'bazdid'}, async function (err, reqs) {
                            res.redirect(redirecturl + '?message=successcancell');
                        });
                    else
                        res.redirect(redirecturl + '?message=successcancell');
                else
                    res.redirect(redirecturl + '?message=successcancell');
            }
            else
                res.redirect(redirecturl + '?message=successcancell');

        }

    });
};
