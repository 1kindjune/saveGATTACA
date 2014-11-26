var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

//my schema goes here!

var DNA = new mongoose.Schema({
	dnaName: String,
	slug: String
});

List.plugin(URLSlugs('dnaName'));

mongoose.model('DNA', DNA);

mongoose.connect('mongodb://localhost/finalproject');
