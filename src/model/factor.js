

var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var factorScheme = new mongoose.Schema({
    phone:  {type: String},
    requester:  {type: String},
    requestid:  {type: String},
    requestkind: {type: String},
    arzeshafzude:  {type: String},
    factorsum:  {type: String},
    factorcount:  {type: String},
    factordate:  {type: Date, default: Date.now},
    factormaliat:  {type: String},
    title: [{type: String}],
    percost:[{type: String}],
    status:{type:String},
    walletid:{type:String},
    quantity:[{type: String}],
    comment:[{type: String}],
    created: {type: Date, default: Date.now},
});
factorScheme.plugin(autoIncrement.plugin, 'factor');
module.exports = db.model('factor', factorScheme);
