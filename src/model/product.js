

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var productScheme = new mongoose.Schema({
    productname: {type: String},
    productcost: {type: String},
    productcount: {type: String},
    catname: {type: String},
    product_pic: {type: String},
    productdetail: {type: String},
    status: {type: String},
    created: {type: Date, default: Date.now},
});
productScheme.plugin(autoIncrement.plugin, 'product');
module.exports = db.model('product', productScheme);
