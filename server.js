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
var User = require('./Schemas/User');


//Middlewares
app.use(bodyParser.json());



//Authentication
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
	clientID: "1141773389211867",
	clientSecret: "48fc279938c0e7661516045e5f80e6d9",
	callbackURL: "auth/facebook/callback"
},
	function(accessToken, refreshToken, profile, done){
	console.log('noterr!')
	User.findOne({'facebook.id': profile.id}, function(err, user){
		if (err) return done(err);
		if (!user){
			user = new User({
				name: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'facebook',
				facebook: profile._json
			});
			user.save(function(err){
				if (err) console.log(err);
				return done(err, user);
			});
		} else {
			return done(err, user);
		}
	})
	}
))
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/',
																			failureRedirect: '/login'
																							}));




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



//Path
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

//Listen
var port = process.env.PORT || 3001
app.listen(port, function(req, res){
	console.log('server listening on port: ' + port)
})