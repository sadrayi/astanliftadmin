

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment-fix');

autoIncrement.initialize(global.db);
var TeknesianScheme = new mongoose.Schema({
    codemeli: {
        type: String,
        required: true,
        lowercase:true
    },
    lastname: {type: String},
    gender: {type: String},
    address: {type: String},
    phone: {type: String},
    profile_pic: {type: String},
    birthdate: {type: Date},
    type: [{type: String}],
    sherkatsabtno: {type: String},
    about: {type: String},
    created: {type: Date, default: Date.now},
});
TeknesianScheme.plugin(autoIncrement.plugin, 'Teknesian');
module.exports = db.model('Teknesian', TeknesianScheme);
