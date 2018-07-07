matlabModel = require('../../../model/matlab');

exports.imani = async (req, res) => {
    matlabsavemethod(req,res,'نکات ایمنی و نجات')
};
exports.certificate = async (req, res) => {
    matlabsavemethod(req,res,'گواهینامه')
};
exports.rules = async (req, res) => {
    matlabsavemethod(req,res,'قوانین')
};
exports.learning = async (req, res) => {
    matlabsavemethod(req,res,'دوره آموزشی')
};
exports.recepie = async (req, res) => {
    matlabsavemethod(req,res,'دستورالعمل')
};
exports.get = async (req, res) => {
    if(req.query.shid)
    {
        await matlabModel.findOne({_id:req.query.shid},async function (err,res2) {
            var kind=res2.kind
            res.render('blog/imani_add', {
                kind:kind,
                sherkat:res2,
                csrfToken: req.csrfToken(),
                activePage: {isAuthenticated: req.isAuthenticated(), matlab_add: true, title: 'افزودن '+kind}
            });
        });
    }
};
var matlabsavemethod=async function(req,res,kind){

        res.render('blog/imani_add', {
            kind:kind,
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated(), matlab_add: true, title: 'افزودن '+kind}
        });
};
exports.post = async (req, res) => {
    var body = req.body;
    var url;
    switch (body.kind){
        case 'نکات ایمنی و نجات' :
            url='imani_list';
            break;
        case 'گواهینامه' :
            url='certificate_list';
            break;
        case 'قوانین' :
            url='rules_list';
            break;
        case 'دوره آموزشی' :
            url='learning_list';
            break;
        case 'دستورالعمل' :
            url='recepie_list';
            break;
    }
    console.log(body);
    if (req.files.matlab_pic){
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.matlab_pic;
        let extension =sampleFile.name.split(".")[1];
        // Use the mv() method to place the file somewhere on your server
        let picname="pro_"+Date.now()+"."+extension;
        await sampleFile.mv('./public/images/matlab_pic/'+picname,async function (err) {
            if (err)
                return res.status(500).send(err);
            else {
                req.body.matlab_pic=picname;
                if(req.body.sabtkind==="register"){
                    var matlabModelsave = new matlabModel(req.body);
                    matlabModelsave.save(function (err) {
                        if(err)
                            res.render('matlab_add', {
                                message:{
                                    kind:"alert-danger",
                                    content:"خطایی در ثبت رخ داده است."
                                },
                                csrfToken: req.csrfToken(),
                                activePage: {
                                    isAuthenticated:req.isAuthenticated(),
                                    sherkat_add: true,
                                    title:'افزودن مطلب'
                                }
                            });
                        res.redirect(url+'?message=successadd');

                    });

                }

                else if(req.body.sabtkind==="update")
                {
                    req.body.matlab_pic=picname;
                    matlabModel.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                        if(err)
                            console.log(err);
                        res.redirect(url+'?message=successedit');

                    })

                }

            }
        });
    }
    else
    {
        if(req.body.sabtkind==="register"){
            var matlabModelsave = new matlabModel(req.body);
            matlabModelsave.save(function (err) {
                if(err)
                    res.render('matlab_add', {
                        message:{
                            kind:"alert-danger",
                            content:"خطایی در ثبت رخ داده است."
                        },
                        csrfToken: req.csrfToken(),
                        activePage: {
                            isAuthenticated:req.isAuthenticated(),
                            sherkat_add: true,
                            title:'ثبت شرکت همکار'
                        }
                    });
                res.redirect(url+'?message=successadd');

            });

        }


        else if(req.body.sabtkind=="update")
        {
            matlabModel.findOneAndUpdate({_id:req.body._id},req.body,function (err) {
                if(err)
                    console.log(err);
                res.redirect(url+'?message=successedit');

            })

        }

    }
};

exports.activate =async (req, res) => {
    await matlabModel.findOneAndUpdate({_id:req.body.matlabid},{status:'active'},async function (err,reqs) {
        var redirecturl;
        switch (reqs.kind){
            case 'نکات ایمنی و نجات' :
                url='imani_list';
                break;
            case 'گواهینامه' :
                url='certificate_list';
                break;
            case 'قوانین' :
                url='rules_list';
                break;
            case 'دوره آموزشی' :
                url='learning_list';
                break;
            case 'دستورالعمل' :
                url='recepie_list';
                break;
        }
        if(err)
            res.redirect(url+'?message=errorcancell');
        else {
            await factorModel.findOneAndUpdate({requestid:req.body.requestid},{status:'cancelled'},async function (err,res2) {
                res.redirect(url+'?message=successcancell');
            });
        }

    });
};
exports.deactivate =async (req, res) => {
    await matlabModel.findOneAndUpdate({_id:req.body.matlabid},{status:'inactive'},async function (err,reqs) {
        var redirecturl;
        switch (reqs.kind){
            case 'نکات ایمنی و نجات' :
                url='imani_list';
                break;
            case 'گواهینامه' :
                url='certificate_list';
                break;
            case 'قوانین' :
                url='rules_list';
                break;
            case 'دوره آموزشی' :
                url='learning_list';
                break;
            case 'دستورالعمل' :
                url='recepie_list';
                break;
        }
        if(err)
            console.log(err)
            res.redirect(url);


    });
};
