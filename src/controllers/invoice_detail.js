var factorModel=require('../model/factor');
var requestModel=require('../model/request');
var walletModel=require('../model/wallet');

exports.get = (req, res) => {
    factorModel.findOne({_id:req.query.id},async function (err,result) {
        await requestModel.findOne({_id:result.requestid},async function(err,request) {
            result.address=request.address;
            result.zone=request.zone;
            result.city=request.city;
            }
        );
        await walletModel.findOne({factorid:result._id},async function(err,wallet) {
            result.paykind=wallet.paykind;
            result.paydate=wallet.paydate;
            }
        );
            res.render('invoice_detail',
            {
                factor:result,
                csrfToken: req.csrfToken(),
                activePage:
                    {
                        isAuthenticated:req.isAuthenticated(),
                        invoice_detail: true,
                        title: 'جزئیات فاکتور'
                    }
            });
    });
};
exports.post = (req, res) => {
    res.render('invoice_detail', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), invoice_detail: true, title:'جزئیات فاکتور'} });
};
