var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');
var DNA = mongoose.model('DNA');



/* GET home page. */
router.get('/', function(req, res) {
//	res.redirect('/login');
  res.render('index', { title: 'Imagine your DNA~' });
  setTimeout(function(){
  	res.redirect('/login');
  }, 1000);
});
router.get('/login', function(req, res){
	res.redirect('/login');
});
router.get('/login/register', function(req, res){
	res.redirect('/register');
});

module.exports = router;
