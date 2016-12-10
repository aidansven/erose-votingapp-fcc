//Node Core Modules
var path = require('path')

//Express
var express = require('express')
var app = express()
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bodyParser = require('body-parser');
var session = require('express-session');

//DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds113608.mlab.com:13608/erose-votingapp-fcc');
var MongoStore = require('connect-mongo')(session);
var Poll = require('./Schemas/Poll');
var User = require('./Schemas/User');


//Middlewares
app.use(express.static(path.join(__dirname, '/client/build')));
passport.serializeUser(function(user, done) {
done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});
app.use(bodyParser.json());
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'cooKieKat',
	cookie: {maxAge: 1000*60*60*8},//ms*s*m*h
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());


//Authentication
passport.use(new FacebookStrategy({
	clientID: "1141773389211867",
	clientSecret: "48fc279938c0e7661516045e5f80e6d9",
	callbackURL: "/auth/facebook/callback"
},
	function(accessToken, refreshToken, profile, done){
	User.findOne({'userid': profile.id}, function(err, user){
		if (err) return done(err);
		if (!user){
			user = new User({
				name: profile.displayName,
				provider: 'facebook',
				userid: profile.id
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
app.get('/api/userinfo', function(req, res){
	res.send(req.user)
})
app.get('/api/logout', function(req, res){
	req.logout();
	res.redirect('/');
})


//Path
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

//Listen
var port = process.env.PORT || 3001
app.listen(port, function(req, res){
	console.log('server listening on port: ' + port)
})