matlab_model = require('../../model/matlab');

exports.imani = async (req, res) => {
    view(req,res,'نکات ایمنی و نجات')
};
exports.certificate = async (req, res) => {
    view(req,res,'گواهینامه')
};
exports.rules = async (req, res) => {
    view(req,res,'قوانین')
};
exports.learning = async (req, res) => {
    view(req,res,'دوره آموزشی')
};
exports.recepie = async (req, res) => {
    view(req,res,'دستورالعمل')
};
var view=async (req, res,kind) => {
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "مطلب با موفقیت افزوده شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "مطلب با موفقیت ویرایش شد.";
            break;
    }
    await matlab_model.find({kind:kind}).then(async function (res3) {
        res.render('blog/matlab_list', {
            products: res3,
            message: {kind: message, content: content},
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), product_add: true, title: 'لیست '+kind}
        });
    });
}
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
