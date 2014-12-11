var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');


function validator (val){
	incorrectDNA = false;
	for (var x = 0; x < val.length; x ++){
  		if (dnaSeq.charAt(x).toUpperCase() !== "A" ||
  			dnaSeq.charAt(x).toUpperCase() !== "T" ||
  			dnaSeq.charAt(x).toUpperCase() !== "G" ||
  			dnaSeq.charAt(x).toUpperCase() !== "C"){
  			incorrectDNA = true;
  		}		
	}
	if (incorrectDNA){ 
		return  false;
	}
	else{
	return true;
	}
}

var custom = [validator, 'Wrong DNA sequence given, must only contain "G", "C", "A", "T"'];

// //my schema goes here
// var User = new mongoose.Schema({
// 	userName: {type: String, required:[true, '{PATH} is required']},
// 	passWord: {type: String, required:[true, '{PATH} is required']},
// 	firstName: {type: String, required:[true, '{PATH} is required']},
// 	lastName: {type: String, required:[true, '{PATH} is required']},
// 	dnaStrands: [{
// 		dnaName: {type: String, required:[true, '{PATH} is required']},
// 		dnaSeq: {type: String, validate: custom },
// 		slug: String
// 	}],
// 	slug: String
// });

var User = new mongoose.Schema({
	userName: String,
	passWord: String,
	firstName: String,
	lastName: String,
	dnaStrands: [{
		dnaName: String,
		dnaSeq: String,
		slug: String
	}],
	slug: String
});

User.plugin(URLSlugs('userName'));

mongoose.model('User', User);

mongoose.connect('mongodb://localhost/dnadb');
