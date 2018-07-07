

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var CategoryScheme = new mongoose.Schema({


    catname: {type: String},
    category_pic: {type: String},
    status: {type: String},
    created: {type: Date, default: Date.now},
});
CategoryScheme.plugin(autoIncrement.plugin, 'Category');
module.exports = db.model('Category', CategoryScheme);
