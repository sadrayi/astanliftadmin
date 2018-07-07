package_model = require('../model/package');

exports.get =async (req, res) => {
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "پکیج با موفقیت افزوده شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "پکیج با موفقیت ویرایش شد.";
            break;
    }
    if(req.query.id)
    {

        await package_model.find({}).then(async function (res3) {
            res.render('pricing_table', {factor:req.query.id, packages:res3, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), pricing_table: true, title:'لیست پکیج های فروش'} });

        });
    }
    else
    await package_model.find({}).then(async function (res3) {
        res.render('pricing_table', {packages:res3, csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), pricing_table: true, title:'لیست پکیج های فروش'} });

    });
};
