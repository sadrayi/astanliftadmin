

var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var AddressScheme = new mongoose.Schema({
    phone: {type: String},
    city: {type: String},
    ostan: {type: String},
    zone: {type: String},
    address: {type: String},
    address_pic: {type: String},
    latlng: {type: String},
    created: {type: Date, default: Date.now},
});
AddressScheme.plugin(autoIncrement.plugin, 'address');
module.exports = db.model('address', AddressScheme);
