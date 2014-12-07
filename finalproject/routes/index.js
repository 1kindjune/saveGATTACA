var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

loggedUser = "";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Imagine your DNA~' });
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
			res.render("login", {
				noUser: true
			});
		}
		else if (req.body.passWord == dbUser.passWord){
			//user exists and password is correct
			loggedUser = dbUser.userName; //only log in if correct password
			res.redirect(("/account/" + dbUser.userName));
		}
		else{ 
			//maybe bring up popup that will say incorrect password, register, relogin?
			res.render("login",{
				wrongPass: true
			});
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
		loggedUser = newUser.userName; //new user is logged in
		res.redirect('/account/' + newUser.slug);
	});
});


//ACCOUNT - USER
router.get("/account/:slug", function(req, res){
	console.log("inside account/user");

	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		
		res.render('account',{
			firstName: dbUser.firstName,
			dnaStrands: dbUser.dnaStrands,
			slug: dbUser.slug
		});
	});
});
router.post('/account/:slug', function(req, res){
	console.log("inside account POST!");
	var stuffChecked = req.body.stuffChecked;

	console.log( "Stuff checked items: " + stuffChecked);

	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		console.log("Inside findOne!");
		
		for(var x = 0; x < dbUser.stuffChecked.length; x++){
			var curItem = dbUser.dnaStrands[x].dnaName;
			console.log("what is in the current item: " + curItem);
			console.log("what value is at this id: "  + req.body.curItem);
			//for(var y = 0; y < )
				//if(dbUser.dnaStrands[x].dnaName == true){
				//	dbUser.dnaStrands.splice(x, 1);
				//}
			//}	
		}
		dbUser.save(function(err){
			res.redirect('/account/' + loggedUser);
		});
	});
});

//ACCOUNT - USER - ADD DNA
//make sure that the dna dont have the same name as a prior one!
router.get("/add", function(req, res){
	res.render("add");
});
router.post("/add", function(req, res){
	console.log("inside add POST");
	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		dbUser.dnaStrands.push({
					dnaName: req.body.dnaName,
					dnaSeq: req.body.dnaSeq,
					//hidden
					notChecked: true,
					slug: req.body.dnaName
		});
		dbUser.save(function(err){
			res.redirect('/account/' + dbUser.slug);
		});
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
				break;
			}
		}
		res.render('dna',{
			dnaName: foundDna.dnaName,
			dnaSeq: foundDna.dnaSeq,
			lenCanvas: ((foundDna.dnaSeq.length) * 80),
			userSlug: dbUser.slug
		});
	});
});


//ACCOUNT - USER - FIND SEQUENCE

//figure out how to log out!

module.exports = router;
