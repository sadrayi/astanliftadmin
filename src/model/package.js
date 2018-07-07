

var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var packageScheme = new mongoose.Schema({
    packagetitle:  {type: String},
    packagecost:  {type: String},
    tawghof:  {type: String},
    darbkind: {type: String},
    assansorkind:  {type: String},
    cabinkind:  {type: String},
    enginekind:  {type: String},
    title: [{type: String}],
    percost:[{type: String}],
    status:{type:String},
    quantity:[{type: String}],
    comment:[{type: String}],
    created: {type: Date, default: Date.now},
});
packageScheme.plugin(autoIncrement.plugin, 'package');
module.exports = db.model('package', packageScheme);
