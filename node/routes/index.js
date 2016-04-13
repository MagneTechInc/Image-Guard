var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MagneTech' });
});

/* GET sign up form page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* GET login form page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
