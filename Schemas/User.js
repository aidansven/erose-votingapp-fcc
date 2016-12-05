var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	username: {type: String, required: true, unique: true},
	password: String,
	provider: String,
	facebook: Object
});

var User = mongoose.model('User', userSchema)
module.exports = User;