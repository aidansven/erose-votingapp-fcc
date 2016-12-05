var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
	question: String,
	options: Array
})

var Poll = mongoose.model('Poll', pollSchema)
module.exports = Poll;