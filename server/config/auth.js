/**
 * Created by LDL on 10/8/2014.
 */
var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false})
            }
            req.logIn(user, function(err) {
                if (err) return next(err);
                res.send({success: true});
            });
        },{session:true});

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function(req, res, next) {
        console.log("try authenticate  : " + req.isAuthenticated()+ " session=>> "+ JSON.stringify(req.session));
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function(role) {
        return function(req, res, next) {
            console.log("Checking role");
            console.log(req.user);
            if (req.isAuthenticated() && req.user.role === role) {
                next();
            }
            else {
                res.status(403);
                res.end();
            }
        }
    }
};
