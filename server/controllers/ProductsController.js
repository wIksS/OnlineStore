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
                res.end();
            } else {
                res.end();
            }
        });
    },
    deleteProduct:function(req,res,next){
        Product.remove({_id: req.params.id}).exec(function(err){
            if(err) {
                res.json(err);
            }
        });
    },
    getAllProducts:function(req,res,next){
        Product.find({}).exec(function(err,data){
            console.log(data);
            res.render(__dirname + "/../views/partials/products",{products:data});
        })
    },
    getAdminProducts:function(req,res,next){
        Product.find({}).exec(function(err,data){
            console.log(data);
            res.render(__dirname + "/../views/partials/admin",{products:data});
        })
    }
};