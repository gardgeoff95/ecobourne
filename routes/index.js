const request = require("request");
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api/");
const User = require("../models/account");

// API Routes
router.use("/api", apiRoutes);

//POST route for updating data
router.post('/', function (req, res, next) {

    if (req.body.username &&
        req.body.login &&
        req.body.password &&
        req.body.passwordConf) {

        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Password doesn\'t match!');
            err.status = 400;
            return next(console.log(err));
            // return next(setTimeout(function(){res.redirect('/')}, 3000));
            // return next(res.redirect('/'));
        } else if (req.body.password === req.body.passwordConf) {
            var userData = {
                login: req.body.login,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }

            User.create(userData, function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/');
                }
            });
        } else {
            var err = new Error('All fields are required!');
            err.status = 400;
            return next(err);
        }
    } else if (req.body.login && req.body.logpassword) {
        User.authenticate(req.body.login, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong login or password!');
                err.status = 401;
                // return next(err);
                return next(console.log(err))
            } else {
                req.session.userId = user._id;
                return (
                    console.log("this is user", user),
                    console.log("logged in")
                    // res.json(user)
                );
            }
        });
    }
});

// GET route to redirect to '/profile' page after registering
router.get('/', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.json(user.username, user.login)
                }
            }
        });
});

// GET for logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// If no API routes are hit, send the React app
router.use((req, res) =>
    res.sendFile(path.join(__dirname, "../client/public/index.html"))
);

module.exports = router;