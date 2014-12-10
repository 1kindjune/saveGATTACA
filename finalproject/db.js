var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

//my schema goes here
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
