var Teknesian = require("../model/teknesian");
exports.get =async (req, res) => {
    switch (req.query.message)
    {
        case "successadd":
            var message = "alert-success";
            var content = "تکنسین با موفقیت انجام شد.";
            break;
        case "successedit":
            var message = "alert-success";
            var content = "تکنسین با موفقیت ویرایش شد.";
            break;
    }
    await Teknesian.find({}).then(async function (res2) {

        res.render('teknesian_list', {
            sherkatlist:res2,
            message: {kind: message, content: content},
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), sherkat_list: true, title: 'لیست تکنسین ها'}
        });
    });
};
