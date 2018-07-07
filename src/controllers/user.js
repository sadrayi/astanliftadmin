var User = require("../model/user");
exports.get =async (req, res) => {
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
    await User.find({}).then(async function (res2) {

        res.render('user_list', {
            userlist:res2,
            message: {kind: message, content: content},
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), sherkat_list: true, title: 'لیست کاربر ها'}
        });
    });
};
