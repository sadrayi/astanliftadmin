

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);

var UserScheme = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        lowercase:true
    },
    name: {type: String},
    birthdate: {type: Date},
    email: {type: String},
    created: {type: Date, default: Date.now},
});
UserScheme.plugin(autoIncrement.plugin, 'user');
module.exports = db.model('user', UserScheme);
