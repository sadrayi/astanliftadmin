

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var walletScheme = new mongoose.Schema({
    payreciever:  {type: String},
    payamount:  {type: String},
    paydate:  {type: String},
    paykindtext:  {type: String},
    paykind:  {type: String},
    factorid:  {type: String},
    paycomment:  {type: String},
    created: {type: Date, default: Date.now},
});
walletScheme.plugin(autoIncrement.plugin, 'wallet');
module.exports = db.model('wallet', walletScheme);
