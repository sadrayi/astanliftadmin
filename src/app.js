const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// import 'express-handlebars'
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

//const controllers = require('./controllers/index');
// import helpers
const helpers = require('./views/helpers/index');

const app = express();
var session = require('express-session'),
    csrf = require('csurf'),
 logger = require('morgan'),

bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    Account = require(__dirname +'/model/account'),
    compression = require('compression'),
    uristring = process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/astanliftlocal',
    passport = require('passport');
mongoose.Promise = global.Promise;

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.use(compression());
//// etesal be database ///
global.db = mongoose.createConnection(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});
/// end

//// debugger
app.use(logger('dev'));
//// body parser baiarie dariaft moteghaie az url
app.use(bodyParser.urlencoded({extended: false}));

///// cookie control
app.use(cookieParser());

/////// tarif session ////
app.use(
    session(
        {
            secret: process.env.SESSION_SECRET || 'majidsadrayi',
            resave: false,
            saveUninitialized: true,
            cookie : {
                maxAge : 7 * 24 * 60 * 60 * 1000 // seconds which equals 1 week
            }
        }
    )
);
///// end ///////

//// error handler for csrf tokens ////
app.use(csrf());
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }
    // handle CSRF token errors here
    res.status(403);
    res.send('Session has expired or form tampered with.');
});
///// end //////

///// express file upload
app.use(fileUpload());

////// passport //////
app.use(passport.initialize());
app.use(passport.session());
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
//////// end //////////

///// motor view
///// favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
///// directory public ( static )
app.use(express.static(path.join(__dirname, '..', 'public')));
///// route asli
require(__dirname +'/controllers/index')(app, passport, Account);
app.set('port', process.env.PORT || 3000);

module.exports.app = app;
