var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* Sign up post */
router.post('/signup', function (req, res, next) {
    console.log(req.body);
    console.log(req.files);

    var db = req.db;
    var users = db.get('users');
    var data = req.body;

        users.findOne({username:data.username}, function(err, docs){
            if (err)
            {
                res.send(err);
            }
            else if (docs != null)
            {
                res.send(403,{message:'Username exists'});
            }
            else
            {
                data.img_path = '../images/' + req.files[0].filename;
                res.send(data);
            }
        });
});

/* Sign up password post */
router.post('/signup_password', function (req, res, next) {
    console.log(req.body);

    var db = req.db;
    var users = db.get('users');
    var data = req.body;
        users.insert(data, function (err, doc) {
            if (err) {
                res.send(e.stack);
            } else {
                req.session.username = req.body.username;
                res.json({ok: true});
            }
        });

});


/* POST user login */
router.post('/login', function (req, res, next) {
    console.log(req.body);
    var db = req.db;
    var users = db.get('users');
    users.findOne({username: req.body.username}, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            if (docs != null) {
                console.log('login user ' + docs.username + ' ' + docs.password);
                res.send({status:"ok", username: req.body.username, img_path: docs.img_path});
            } else {
                res.send('user does not exist');
            }
        }
    });
});

router.post('/login_password', function (req, res, next) {
    console.log("----------------------");
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    var db = req.db;
    var users = db.get('users');
    users.findOne({username: req.body.username}, function (err, docs) {
        if (err) {
            res.send(err.stack);
        } else {
            console.log("----------docs--------------");
            console.log(docs.password);
            if (req.body.password == docs.password) {
                req.session.username = req.body.username;
                res.json({ok: true});
            } else {
                console.log("wrong username or password");
                res.json({data: "wrong username or password"});
            }
        }
    });
});

/* POST user logout */
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/profile', function (req, res, next) {
    var db = req.db;
    var users = db.get('users');
    users.find({}, {}, function (e, docs) {
        res.render('profile', {
            userlist: docs
        });
    });
});

router.get('/info', function (req, res, next) {
    var db = req.db;
    var users = db.get('users');
    users.findOne({username: req.session.username}, {}, function (e, docs) {
        res.render('user_info', {
            user: docs
        });
    });
});
/*POST Password Reset*/
router.post('/reset', function(req, res, next){
    console.log(req.body);
    console.log(req.files);
    var db = req.db;
    var users = db.get('users');
    var email = req.body.email;
    var data = req.body;
    users.findOne({username: req.body.username}, function(err, docs){
        if (err){
            res.send(err.stack);
        } else {
            if (docs != null){
                if(email != docs.email){
                    res.end('{"success" : "wrong"}');
                }
                else{
                    data.img_path = '../images/' + req.files[0].filename;
                    res.send(data);
                }
            } else {
                res.end('{"success" : "wrong"}');
            }
        }
    });
});
router.post('/reset_update', function (req, res, next) {
    console.log(req.body);

    var db = req.db;
    var users = db.get('users');
    var data = req.body;
    users.update({username:data.username},{$set: {img_path:data.img_path, password:data.password}}, {}, function(err, doc){
        if (err) {
            res.send(e.stack);
        } else {
            res.json({ok: true});
        }
    });

});
module.exports = router;
