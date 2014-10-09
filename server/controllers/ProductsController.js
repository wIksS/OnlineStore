/**
 * Created by Виктор on 9.10.2014 г..
 */
/**
 * Created by LDL on 10/8/2014.
 */
var Product = require("mongoose").model("Product"),
    fs = require('fs');

module.exports = {
    createProduct:function(req,res,next){
//        var produuctData= req.body;
//       // userData.role="user";
//        //TODO: Check if admin
//        var newProduct = new Product(produuctData);
//        newProduct.save(function(err,user){
//            if(err){
//                console.log("Product cant be created : " + err);
//                res.status(400);
//                res.end();
//            } else {
//                res.end();
//            }
//        });

        var fstream;
        req.pipe(req.busboy);

        var product = {};

        req.busboy.on('file', function (fieldname, file, filename) {
            console.log('in the file');
            fstream = fs.createWriteStream(__dirname + '/../../pictures/' + filename);
            file.pipe(fstream);
            product.picture = filename;
        });

        req.busboy.on('field', function(fieldname, val) {
            if (fieldname === 'colors') {
                product[fieldname] = val.split(',');
            }
            else {
                product[fieldname] = val;
            }
        });

        req.busboy.on('finish', function() {
            var newProduct = new Product(product);
            newProduct.save(function(err){
                if(err){
                    console.log("Product cant be created : " + err);
                    res.status(400);
                    res.end();
                } else {
                    res.end();
                }
            });
        });
    },
    getAllProducts:function(req,res,next){
        Product.find({}).exec(function(err,data){
            console.log(data);
            res.render(__dirname + "/../views/partials/products",{products:data});
        })
    }
};