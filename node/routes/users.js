var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user login */
router.post('/login', function(req, res, next){
  console.log(req.body);
  if (req.body.username == "admin" && req.body.password == "admin"){
    req.session.username = req.body.username;
    res.redirect('/');
  } else {
    res.send("wrong username or password");
  }

});

/* POST user logout */
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
