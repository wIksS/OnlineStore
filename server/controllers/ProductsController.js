/**
 * Created by Виктор on 9.10.2014 г..
 */
/**
 * Created by LDL on 10/8/2014.
 */
var Product = require("mongoose").model("Product");

module.exports = {
    createProduct:function(req,res,next){
        var produuctData= req.body;
       // userData.role="user";
        //TODO: Check if admin
        var newProduct = new Product(produuctData);
        newProduct.save(function(err,user){
            if(err){
                console.log("Product cant be created : " + err);
                res.status(400);
                res.end({message:"The product cant be created. Please try with a different name."});
            } else {
                res.end({message :"Product created"});
            }
        });
    },
    getAllProducts:function(req,res,next){
        Product.find({}).exec(function(err,data){
//            if(err){
//            }
            res.send(data);
        })
    }
};