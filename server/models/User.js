/**
 * Created by LDL on 10/8/2014.
 */
var mongoose = require("mongoose");
var crypto =require("crypto");

var userSchema = new mongoose.Schema({
    userName: {type: String, require: "{PATH} is required!",unique:true},
    firstName:{type: String, require: "{PATH} is required!"},
    lastName:{type: String, require: "{PATH} is required!"},
    role:{type: String, require: "{PATH} is required!"},
    hashedPassword: { type: String, default: '', require: "{PATH} is required!" },
    salt: { type: String, default: '' , require: "{PATH} is required!"}
});
userSchema.virtual("password")
    .set(function(pass){
        this.salt = makeSalt();
        var sha1 = crypto.createHash("sha1");
        sha1.update(pass+this.salt);
        this.hashedPassword =  sha1.digest('hex');
    });
userSchema.method({
    authenticate:function(pass){
        var sha1 = crypto.createHash("sha1");
        sha1.update(pass+this.salt);
        return this.hashedPassword === sha1.digest('hex');
    }
});
var User = mongoose.model("User",userSchema);
//TODO Create admin accounts
function makeSalt(){
    return Math.round(Math.random()*1000000000000);
}
