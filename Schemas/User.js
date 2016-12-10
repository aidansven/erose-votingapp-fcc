var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	provider: String,
	userid: String
});

var User = mongoose.model('User', userSchema)
module.exports = User;