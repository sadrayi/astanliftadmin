

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var matlabScheme = new mongoose.Schema({
    title: {type: String},
    kind: {type: String},
    matlab_pic: {type: String},
    detail: {type: String},
    status: {type: String},
    created: {type: Date, default: Date.now},
});
matlabScheme.plugin(autoIncrement.plugin, 'matlab');
module.exports = db.model('matlab', matlabScheme);
