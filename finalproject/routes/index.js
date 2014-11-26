var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var DNA = mongoose.model('DNA');




/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/login');
//  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res){
});
router.get('/login/register', function(req, res){
});

module.exports = router;
