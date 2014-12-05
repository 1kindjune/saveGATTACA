var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');
//var DNA = mongoose.model('DNA');

loggedUser = "";

/* GET home page. */
router.get('/', function(req, res) {
//	res.redirect('/login');
  //res.render('index', { title: 'Imagine your DNA~' });
  //setTimeout(function(){ //wait abit before moving to login page
  	res.redirect('/login');
  //}, 1000);
});

//LOGIN
router.get('/login', function(req, res){
	res.render('login', {title: "Login!"});
});
router.post('/login', function(req, res){
	User.findOne({userName: req.body.userName}, function(err, dbUser, count){
		console.log("The data base user is: " + dbUser);
		if (dbUser == null){
			//user doesnt exist
			//maybe bring up popup that will ask to register or relogin?
			res.redirect("/login");
		}
		else if (req.body.passWord == dbUser.passWord){
			//user exists and password is correct

			loggedUser = dbUser.userName; //only log in if correct password
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
router.post('/register', function(req, res){
	new User({
		userName: req.body.userName,
		passWord: req.body.passWord,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		//hidden
		dnaStrands: [],
		slug: req.body.slug
	}).save(function(err, newUser, count){
		//move to the new user site
		//res.redirect("/login");
		loggedUser = newUser.userName; //new user is logged in
		res.redirect('/account/' + newUser.slug);
	});
});


//ACCOUNT - USER
router.get("/account/:slug", function(req, res){
//	var user = req.params.slug;
	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		res.render('account',{
			firstName: dbUser.firstName,
			dnaStrands: dbUser.dnaStrands,
			slug: dbUser.slug
		});
	});
});
router.post('/account/', function(req, res){

});

//ACCOUNT - USER - ADD DNA
//how to transfer information about account to add slugs?
//make sure that the dna dont have the same name as a prior one!
router.get("/add", function(req, res){
	res.render("add");
});
router.post("/add", function(req, res){
	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		dbUser.dnaStrands.push({
					dnaName: req.body.dnaName,
					dnaSeq: req.body.dnaSeq,
					//hidden
					slug: req.body.dnaName
		});
		dbUser.save();
		res.redirect('/account/' + dbUser.slug);
	});
});

//ACCOUNT - USER - DNA INFO
router.get("/dna/:slug", function(req, res){
//	var dna = req.params.slug;
	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		var x = ""; //makesure that this value changes after the for loop
		for (x = 0; x < dbUser.dnaStrands.length; x++){
			if (dbUser.dnaStrands[x].dnaName == req.params.slug){
				var foundDna = dbUser.dnaStrands[x];
				//can variables hold schema?
				break;
			}
		}
		/* OR
		res.render('dna', {
			dnaName: dbUser.dnaStrands[x].dnaName,
			dnaSeq: dbUser.dnaStrands[x].dnaSeq,
			slug: dbUser.dnaStrands[x].slug
		});
		*/
		res.render('dna',{
			dnaName: foundDna.dnaName,
			dnaSeq: foundDna.dnaSeq,
			slug: foundDna.slug
		});
	});
});


//ACCOUNT - USER - FIND SEQUENCE

//figure out how to log out!

module.exports = router;
