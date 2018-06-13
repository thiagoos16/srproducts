var express = require('express');
var router = express.Router();

/*GET all products. */
router.get('/', function (req, res, next){
    var db = require('../database');
    var schema = require('../../products/schema');
    var Products = db.Mongoose.model('products', schema.ProductSchema);
    
    Products.find({}).lean().exec(function(e, docs) {
        res.json(docs);
        res.end();
    });
});

/*POST ONE product. */
router.post('/', function(req, res, next){
    var db = require('../database');
    var schema = require('../../products/schema');
    var Product = db.Mongoose.model('products', schema.ProductSchema);
    console.log(req.body.productInfo[0]['paymentConditions']);
    console.log(req.body.productInfo[0].paymentConditions);
    var newProduct = new Product({businessId: req.body.businessId, name: req.body.name, 
                                    imageName: req.body.imageName, detailUrl: req.body.detailUrl,
                                    price: req.body.price, oldPrice: req.body.oldPrice,
                                    category: req.body.category,
                                    productInfo: req.body.productInfo[0]
                                });
    
    newProduct.save(function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(newProduct);
        res.end();
    });
});

module.exports = router;
