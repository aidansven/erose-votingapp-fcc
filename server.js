//Node Core Modules
var path = require('path')

//Express
var express = require('express')
var app = express()
app.use(express.static(path.join(__dirname, '/client/build')))
var bodyParser = require('body-parser');

//DB
var mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin@ds113608.mlab.com:13608/erose-votingapp-fcc')
var Poll = require('./Schemas/Poll');

//Authentication
var passport = require('passport');

//Middlewares
app.use(bodyParser.json());


//APIs
app.get('/api/loadpolls', function(req, res){
	Poll.find({}, function(err, polls){
		if (err) throw err;
		res.send(polls);
	})
});
app.get('/api/poll/:pollid', function(req, res){
	Poll.findOne({_id: req.params.pollid}, function(err, poll){
		if (err) throw err;
		res.send(poll);
	})
})
app.post('/api/addvote', function(req, res){
	Poll.update({_id: req.body._id}, req.body, function(err){
		if (err) throw err;
		res.end()
	})
})
app.post('/api/newpoll', function(req, res){
	var newPoll = new Poll(req.body)
	newPoll.save(); res.end();
});
app.post('/api/login', passport.authenticate('local'), function(req, res){
	res.redirect('/profile/' + req.user.username);
});



//Path
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

//Listen
var port = process.env.PORT || 3001
app.listen(port, function(req, res){
	console.log('server listening on port: ' + port)
})