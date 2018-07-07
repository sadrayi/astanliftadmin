var packageModek=require('../model/package');

exports.get = async(req, res) => {
    if(req.query.shid)
    {
        await packageModek.findOne({_id:req.query.shid},async function (err,res2) {
            res.render('package_add', {
                sherkat:res2,
                csrfToken: req.csrfToken(),
                activePage: {isAuthenticated: req.isAuthenticated(), matlab_add: true, title: 'افزودن پکیج فروش'}
            });
        });
    }
    else
        res.render('package_add', {
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), matlab_add: true, title: 'افزودن پکیج فروش'}
        });
};
exports.post = async(req, res) => {
    var body= req.body;
    console.log(body);
    if(body.sabtkind==="register"){
    var packageSave=new packageModek(body);
    await packageSave.save().then(async function (err) {
        if(err)
            console.log(err);
                res.redirect('pricing_table?message=successadd');
            });
    }
    else
    if(body.sabtkind==="update") {
        packageModek.findOneAndUpdate({_id:req.body.id},req.body,function (err) {
            if(err)
                console.log(err);
            res.redirect('pricing_table?message=successedit');

        })

    }
    };
