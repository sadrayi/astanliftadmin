


var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);var requestScheme = new mongoose.Schema({
    phone: {type: String},
    kind: {type: String},
    requester: {type: String},
    city: {type: String},
    addressid: {type: String},
    eshterakstatus: {type: String},
    address_pic: {type: String},
    ostan: {type: String},
    zone: {type: String},
    requestdate: {type: Date},
    address: {type: String},
    latlng: {type: String},
    teknesiankind: {type: String},
    teknesian: {type: String},
    comment: {type: String},
    status: {type: String},
    created: {type: Date, default: Date.now},
});
requestScheme.plugin(autoIncrement.plugin, 'request ');

module.exports = db.model('request', requestScheme);
