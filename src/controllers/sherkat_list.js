var Sherkat = require("../model/sherkatha");
exports.get =async (req, res) => {
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "ثبت نام با موفقیت انجام شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "شرکت با موفقیت ویرایش شد.";
            break;
    }
    await Sherkat.find({}).then(async function (res2) {

        res.render('sherkat_list', {
            sherkatlist:res2,
            message: {kind: message, content: content},
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), sherkat_list: true, title: 'لیست شرکتهای همکار'}
        });
    });
    };
