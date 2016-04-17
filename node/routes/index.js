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
/* GET password reset form page. */
router.get('/password_reset', function(req, res, next) {
  res.render('password_reset');
});



module.exports = router;
