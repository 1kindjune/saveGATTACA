var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');
var DNA = mongoose.model('DNA');


/* GET home page. */
router.get('/', function(req, res) {
//	res.redirect('/login');
  res.render('index', { title: 'Imagine your DNA~' });
//  setTimeout(function(){ //wait abit before moving to login page
  	res.redirect('/login');
//  }, 1000);
});

//LOGIN
router.get('/login', function(req, res){
	res.render('login', {title: "Login!"});
});
router.post('/login', function(req, res){
	User.findOne({userName: req.body.userName}, function(err, dbUser, count){
		console.log("Current user is : " + curUserName);
		console.log("The data base user is: " + dbUser);
		if (dbUser == null){
			//user doesnt exist
			//maybe bring up popup that will ask to register or relogin?
			res.redirect("/login");
		}
		else if (req.body.passWord == dbUser.passWord){
			//user exists and password is correct
			res.redirect(("/account/" + dbUser.userName));
		}
		else{ 
			//maybe bring up popup that will say incorrect password, register, relogin?
			res.redirect("/login");
		}
	});
	
});

//REGISTER
router.get('/register', function(req, res){
	res.render('register');
});
router.post('/account', function(req, res){
	new User({
		userName: req.body.userName,
		passWord: req.body.passWord,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		//hidden
		dnaStrands: [],
		slug: req.body.slug
	}).save(function(err, newUser){
		//move to the new user site
		res.redirect("/login");
		//res.redirect('/user/' + newUser.slug);
	});
});

//ACCOUNT

//ACCOUNT - USER

//ACCOUNT - USER - ADD DNA

//ACCOUNT - USER - DNA INFO

//ACCOUNT - USER - FIND SEQUENCE


module.exports = router;
