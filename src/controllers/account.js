
exports.login = (req, res,Account) => {
};
exports.register = (req, res,Account) => {
    Account.register(
        new Account(
            {
                username: req.body.fullname,
                email: req.body.email
            }
        ),
        req.body.password,
        function(err) {
            if (err) {
                console.log('error while user register!', err);
                return next(err);
            }
            console.log('user registered!');
            res.redirect('back');
        }
    );};
