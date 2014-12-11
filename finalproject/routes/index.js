var express = require('express');

//??
// var session = require('express-session');
// var app = express();
// var sessionOptions = {
// 	secret: 'secret cookie thangyasd10129jvnbjs3',
// 	resave: true,
// 	saveUninitialized: true
// };
// app.use(express.cookieParser());
// app.use(session(sessionOptions));
//??

var router = express.Router();
var mongoose = require('mongoose');
//crypt
var bcrypt = require('bcrypt');

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
	console.log(req.body.userName);
	User.findOne({userName: req.body.userName}, function(err, dbUser, count){
		if (dbUser === null){
			//user doesnt exist
			//maybe bring up popup that will ask to register or relogin?
			res.render("login", {
				noFade: true,
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
				noFade: true,
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

	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		
		res.render('account',{
			firstName: dbUser.firstName,
			dnaStrands: dbUser.dnaStrands,
			slug: dbUser.slug
		});
	});
});
router.post('/account/', function(req, res){
	var stuffChecked = req.body.stuffChecked;

	if(req.body.logOut == "logout"){
		//req.session.destroy();
		loggedUser = "";
		res.render('login', {title: "Login!"});
	}

	if(stuffChecked !== undefined){
		if (stuffChecked.length ==1){
			stuffChecked = req.body.name;
		}
		stuffChecked = ("" + req.body.stuffChecked).split(",");

		User.findOne({userName: loggedUser}, function(err, dbUser, count){
			var curItem;
			for(var x = 0; x < stuffChecked.length; x++){
				curItem = stuffChecked[x];
				if(dbUser.dnaStrands.length === null){ //empty
					break;
				}
				for(var y = 0; y < dbUser.dnaStrands.length; y++){
					if(dbUser.dnaStrands[y].dnaName == curItem){
						dbUser.dnaStrands.splice(y, 1);
						dbUser.save(); //do i need this???
					}
				}	
			}
			dbUser.save(function(err){
				res.redirect('/account/' + dbUser.slug);
			});
		});
	//do nothing since nothing was checked
	}
	else{
			User.findOne({userName: loggedUser}, function(err, dbUser, count){
		
			res.render('account',{
				firstName: dbUser.firstName,
				dnaStrands: dbUser.dnaStrands,
				slug: dbUser.slug,
				nothingDeleted: true
		});
	});
	}
});

//ACCOUNT - USER - ADD DNA
//make sure that the dna dont have the same name as a prior one!
router.get("/add", function(req, res){
	res.render("add");
});
router.post("/add", function(req, res){	
	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		dbUser.dnaStrands.push({
					dnaName: req.body.dnaName,
					dnaSeq: req.body.dnaSeq,
					slug: req.body.dnaName
		});
		dbUser.save(function(err, dnaName, count){
//			if (err){
//				res.render('add', {err: err});
//			}
//			else{
				res.redirect('/account/' + dbUser.slug);				
//			}
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
			lenCanvas: ((foundDna.dnaSeq.length + 4) * 80),
			userSlug: dbUser.slug
		});
	});
});

router.post("/dna/", function(req, res){
	var findDna = req.body.findDna;
	var seq = req.body.seq;
	var occurrences = 0;

	var a = seq.indexOf(findDna);

	while(a!=-1){
	   seq = seq.slice(a * 1 + findDna.length);
	   occurrences++;
	   a = seq.indexOf(findDna);
	 }

	User.findOne({userName: loggedUser}, function(err, dbUser, count){
		var x = ""; //makesure that this value changes after the for loop
		for (x = 0; x < dbUser.dnaStrands.length; x++){
			if (dbUser.dnaStrands[x].dnaName == req.body.dnaName){
				var foundDna = dbUser.dnaStrands[x];
				break;
			}
		}
		res.render('dna',{
			dnaName: foundDna.dnaName,
			dnaSeq: foundDna.dnaSeq,
			lenCanvas: ((foundDna.dnaSeq.length + 4) * 80),
			userSlug: dbUser.slug,
			found: true,
			occur: occurrences
		});
	});			
});

module.exports = router;












