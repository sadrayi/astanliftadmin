//const app = express.Router();
module.exports = function (app, passport, Account) {
// import home route controller
    const home = require('./home');
    const fruits = require('./fruits');
    const user = require('./user');
    const teknesian = require('./sherkat_list');
    const teknesian2 = require('./teknesian2');
    const login = require('./login');
    const operator = require('./operator');
    const invoice_list = require('./invoice_list');
    const teknesian_detail = require('./teknesian_detail');
    const sale_request = require('./sale_request');
    const tamir_form = require('./tamir_form');
    const calendar = require('./calendar');
    const nezarat_list = require('./nezarat_list');
    const user_add = require('./user_add');
    const teknesian_add = require('./teknesian_add');
    const invoice_detail = require('./invoice_detail');
    const payment = require('./payment');
    const operator_add = require('./operator_add');
    const contract_detail = require('./contract_detail');
    const category_list = require('./category_list');
    const singleFruit = require('./singlefruit');
    const standard_list = require('./estandard_list');
    const repair_list = require('./repair_list');
    const product_add = require('./product_add');
    const contract_list = require('./contract_list');
    const contracts = require('./contracts');
    const contract_add = require('./contract_add');
    const asansorsale = require('./asansorsale_list');
    const sherkat_add = require('./sherkat_add');
    const product_detail = require('./product_detail');
    const pricing_table = require('./pricing_table');
    const poshtibani_list = require('./poshtibani_list');
    const request_list = require('./request_list');
    const product_category = require('./product_category');
    const request_add = require('./request_add');
    const product_list = require('./product_list');
    const request_view = require('./request_view');
    const imani_add = require('./blog/add/imani_add');
    const matlab_list = require('./blog/matlab_list');
    const category_add = require('./category_add');
    const add_contract = require('./add_contract');
    const factor_add = require('./factor_add');
    const package_add = require('./package_add');
    const map = require('./map');
    const chat = require('./chat');
    const error = require('./error');

    app.post('/register', function(req, res) {
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
        );
    });

    app.post('/account', passport.authenticate('local',{successRedirect: '/',
        failureRedirect: '/login'}), function(req, res) {
        if (!req.body.remember){
            /* Each session has a unique cookie object accompany it. This allows
            us to alter the session cookie per visitor. We can set
            req.session.cookie.expires to false to enable the cookie to remain
            for only the duration of the user-agent. This user should log in
            again after restarting the browser. */
            req.session.cookie.expires = false;
        }
        res.redirect('back');
    });
// add home route
    app.get('/', function(req,res){
        res.render('blank', {
        csrfToken: req.csrfToken(),
        activePage: {isAuthenticated: req.isAuthenticated()}
    })}
    );
    app.get('/package_add', package_add.get);
    app.get('/map', map.get);
    app.get('/chat', chat.get);
    app.post('/package_add', package_add.post);
    app.post('/deactivate_matlab', imani_add.deactivate);
    app.post('/activate_matlab', imani_add.activate);
    app.get('/user_list', user.get);
    app.get('/product_add', product_add.get);
    app.get('/pricing_table', pricing_table.get);
    app.get('/sherkat_list', teknesian.get);
    app.get('/category_add', category_add.get);
    app.get('/imani_list', matlab_list.imani);
    app.get('/matlab_add', imani_add.get);
    app.get('/imani_add', imani_add.imani);
    app.get('/certificate_list', matlab_list.certificate);
    app.get('/certificate_add', imani_add.certificate);
    app.get('/rules_list', matlab_list.rules);
    app.get('/rules_add', imani_add.rules);
    app.get('/learning_add', imani_add.learning);
    app.get('/learning_list', matlab_list.learning);
    app.get('/recepie_add', imani_add.recepie);
    app.get('/recepie_list', matlab_list.recepie);
    app.post('/category_add', category_add.post);
    app.post('/matlab_add', imani_add.post);
    app.post('/product_add', product_add.post);
    app.get('/blank', function(req, res) {
        res.render('blank', {
            csrfToken: req.csrfToken(),
            activePage: {isAuthenticated: req.isAuthenticated()}
        });
    });
    app.get('/sherkat_add', sherkat_add.get);
    app.get('/login', login.get);
    app.get('/standard_list', standard_list.get);
    app.post('/sherkat_add', sherkat_add.save);
    app.get('/standard_add', request_add.standard);
    app.get('/nezarat_add', request_add.nezarat);
    app.get('/poshtibani_add', request_add.poshtibani);
    app.get('/contract_add', request_add.contract);
    app.get('/add_contract', add_contract.get);
    app.post('/add_contract', add_contract.post);
    app.get('/asansorsale_add', request_add.asansorsale);
    app.get('/asansor_add', request_add.asansorsale);
    app.get('/repair_add', request_add.repair);
    app.get('/asansorsale_list', asansorsale.get);
    app.get('/asansor_list', asansorsale.get);
    app.get('/poshtibani_list', poshtibani_list.get);
    app.get('/standard_invoice', invoice_list.standard);
    app.get('/nezarat_invoice', invoice_list.nezarat);
    app.get('/poshtibani_invoice', invoice_list.poshtibani);
    app.get('/contract_invoice', invoice_list.contract);
    app.get('/asansorsale_invoice', invoice_list.asansorsale);
    app.get('/asansor_invoice', invoice_list.asansorsale);
    app.get('/repair_invoice', invoice_list.repair);
    app.get('/repair_list', repair_list.get);
    app.get('/poshtibani_list', poshtibani_list.get);
    app.get('/tamirform_add', tamir_form.get);
    app.post('/tamirform_add', tamir_form.post);
    app.get('/product_category', product_category.get);
    app.get('/category_list', category_list.get);
    app.get('/product_detail', product_detail.get);
    app.get('/contract_list', contract_list.get);
    app.get('/nezarat_list', nezarat_list.get);
    app.get('/request_list', request_list.get);
    app.post('/request_cancell', request_list.cancell);
    app.post('/invoice_cancell', invoice_list.cancell);
    app.get('/request_view', request_view.get);
    app.get('/request_add', request_add.get);
    app.post('/request_add', request_add.post);
    app.get('/product_list', product_list.get);
    app.get('/factor_add', factor_add.get);
    app.post('/factor_add', factor_add.post);
    app.get('/invoice_detail', invoice_detail.get);
    app.get('/invoice_list', invoice_list.get);
    app.get('/teknesian_list', teknesian2.get);
    app.get('/contract_add', contract_add.get);
    app.post('/contract_add', contract_add.post);
    app.post('/payment', payment.post);
    app.get('/sale_request', sale_request.get);
    app.get('/contracts', contracts.get);
    app.get('/operator', operator.get);
    app.get('/contract_view', contract_add.view);
    app.get('/contract_detail', contract_detail.get);
    app.get('/calendar', calendar.get);
    app.get('/teknesian_detail', teknesian_detail.get);
    app.get('/user_add', user_add.get);
    app.post('/user_add', user_add.post);
    app.get('/teknesian_add', teknesian_add.get);
    app.post('/teknesian_add', teknesian_add.post);
    app.get('/operator_add', operator_add.get);
    app.get('/fruits', fruits.get);
    app.get('/fruits/:singleFruit', singleFruit.get);
    app.use(error.client);
    app.use(error.server);
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('back');
    });

};
