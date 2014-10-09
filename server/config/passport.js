/**
 * Created by LDL on 10/8/2014.
 */
var passport= require("passport");
var LocalPassport = require("passport-local").Strategy;
var User = require("mongoose").model("User");

(function(){
    passport.use(new LocalPassport(function(userName, password, done) {
        console.log("added auth");
        User.findOne({ userName: userName }).exec(function(err, user) {
            console.log("try to auth");
            if (err) {
                //TODO handle login error
                console.log('Error loading user: ' + err);
                return;
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        console.log("User serialized.");
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        console.log("User de serialized.");
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
})();