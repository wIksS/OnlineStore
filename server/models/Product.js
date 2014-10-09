/**
 * Created by Виктор on 9.10.2014 г..
 */
var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: {type: String, require: "{PATH} is required!",unique:true},
    description: String,
    colors:[String],
    quantity:Number,
    price:Number,
    picture: String
});

var Product = mongoose.model("Product",productSchema);