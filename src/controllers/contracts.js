var contractModel=require('../model/contract');
exports.get = async (req, res) => {
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "ثبت نام با موفقیت انجام شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "کاربر با موفقیت ویرایش شد.";
            break;
    }
    await contractModel.find({}).then(async function (res2) {

        res.render('contracts', {contract:res2, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), contracts: true, title:'لیست قرارداد ها'} });

    });
};
exports.post = (req, res) => {
    res.render('contracts', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), contracts: true, title:'لیست قرارداد ها'} });
};
