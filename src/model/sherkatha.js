

var mongoose = require('mongoose');
var SherkatScheme = new mongoose.Schema({
    sabtno: {
        type: String,
        required: true,
        lowercase:true
    },
    sherkatname: {type: String, required: true},
    password: {type: String, required: true},
    modirname: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    eshterakstart: {type: Date},
    eshterakend: {type: Date},
    eshteraktype: {type: String},
    karbarlimit: {type: String},
    teknesianlimit: {type: String},
    created: {type: Date, default: Date.now},
});
module.exports = db.model('Sherkatha', SherkatScheme);
