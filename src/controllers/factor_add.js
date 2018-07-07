var requestModel=require('../model/request');
var factorModek=require('../model/factor');
package_model = require('../model/package');

exports.get = async(req, res) => {
    if(req.query.shid)
    {
        await factorModek.findOne({_id:req.query.shid}).then(async function (res2) {
            if(res2!==null)
                res.render('factor_add', {
                    fid:req.query.shid,
                    request:res2,
                    csrfToken: req.csrfToken(),
                    activePage: {isAuthenticated: req.isAuthenticated(), factor_add: true, title: 'ویرایش فاکتور'}
                });
        });
    }
    else
    await requestModel.findOne({_id:req.query.id}).then(async function (res2) {
        if(req.query.pid)
        {
            var pricelist;
            await package_model.findOne({_id:req.query.pid}).then(async function (res3) {
                pricelist=res3;
            if (res2 !== null) {
                res.render('factor_add', {
                    price:pricelist,
                    id: req.query.id,
                    request: res2,
                    csrfToken: req.csrfToken(),
                    activePage: {isAuthenticated: req.isAuthenticated(), factor_add: true, title: 'ثبت فاکتور'}
                });
            }
            else
                res.redirect('invoice_list?message=successedit');
            });
        }
        else {
            if (res2 !== null)
                res.render('factor_add', {
                    id: req.query.id,
                    request: res2,
                    csrfToken: req.csrfToken(),
                    activePage: {isAuthenticated: req.isAuthenticated(), factor_add: true, title: 'ثبت فاکتور'}
                });
            else
                res.redirect('invoice_list?message=successedit');
        }
    });
};
exports.post = async(req, res) => {

    var body = req.body;
    if (req.body.sabtkind === "register") {
        switch(req.body.requestkind){
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
    var factorSave = new factorModek(
        body
    );
    await factorSave.save().then(function (err) {
        if (err)
            console.log(err);
        requestModel.findOneAndUpdate({_id: req.body.requestid}, {$set: {status: "factoradded"}}, function (err) {
            if (err)
                console.log(err);
            res.redirect(redirecturl+'?message=successaddfactor');
        });
    })
}
    else
    {
        if(body.sabtkind==="update") {
                switch(req.body.requestkind){
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
            factorModek.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                if(err)
                    console.log(err);
                res.redirect(redirecturl+'?message=successedit');

            })

        }
    }

};
