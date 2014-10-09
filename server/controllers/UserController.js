/**
 * Created by LDL on 10/8/2014.
 */
var User = require("mongoose").model("User");

module.exports = {
    createUser:function(req,res,next){
        console.log(req);
        var userData= req.body;
        userData.role="user";
        console.log("---------------------");
        console.log(userData);
        var newUser = new User(userData);
        newUser.save(function(err,user){
            if(err){
                console.log("User cant be created : " + err);
                res.status(400);
                res.end();
            } else {
				res.redirect('#/login');
                res.end();
            }
        });
    },
    getAllClients:function(req,res,next){
        User.find({}).where({role:"Client"}).exec(function(err,data){
//            if(err){
//            }
            res.send(data);
        })
    },
    getAllUsers:function(req,res,next){
        User.find({}).exec(function(err,data){
//            if(err){
//                console.log("Can't get users.")
//            }
            res.send(data);
        })
    }
};