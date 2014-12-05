var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

//my schema goes here!

/*refixed schema style, hassle to work with
var DNA = new mongoose.Schema({
	dnaName: String,
	dnaSeq: String,
	slug: String
});*/

var User = new mongoose.Schema({
	userName: String,
	passWord: String,
	firstName: String,
	lastName: String,
//	dnaStrands: [DNA],
	dnaStrands: [{
		dnaName: String,
		dnaSeq: String,
		slug: String
	}],
	slug: String
});

User.plugin(URLSlugs('userName'));
//DNA.plugin(URLSlugs('dnaName'));

mongoose.model('User', User);
//mongoose.model('DNA', DNA);

mongoose.connect('mongodb://localhost/dnadb');
