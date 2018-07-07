

var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var tamirformScheme = new mongoose.Schema({
    phone:  {type: String},
    requester:  {type: String},
    requestid:  {type: String},
    address:  {type: String},
    tamirkind:  {type: String},
    eghdamat:  {type: String},
    teknesianid:  {type: String},
    arzeshafzude:  {type: String},
    factorsum:  {type: String},
    factorcount:  {type: String},
    factormaliat:  {type: String},
    title: [{type: String}],
    percost:[{type: String}],
    quantity:[{type: String}],
    comment:[{type: String}],
    created: {type: Date, default: Date.now},
});
tamirformScheme.plugin(autoIncrement.plugin, 'tamirform');
module.exports = db.model('tamirform', tamirformScheme);
