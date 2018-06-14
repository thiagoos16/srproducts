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

/*GET Recommendation List*/
router.get('/:businessId', function(req, res, next){
    var db = require('../database');
    var schema = require('../../products/schema');
    var businessId = req.params.businessId;
    
    getRecomendations(businessId, db, schema, res);
})

function getRecomendations(businessId, db, schema, res) {
    var Product = db.Mongoose.model('products', schema.ProductSchema);
    var aux = [];
    
    Product.find({businessId: businessId}).exec(function (e, prodRef) {
        category = prodRef[0].category;
        Product.find({category: category}).exec(function (e2, prodsRecomend){
            res.json(padronized(prodRef, prodsRecomend));
            res.end();
        });
    });
} 

function padronized(prodRef, prodsRecomend) {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    
    return {
        data: {
            widget: {
                size: prodsRecomend.length
            },
            references: {
                timestamp: curr_date + "/" + curr_month + "/" + curr_year,
                item: prodRef
            },
            recommendation: prodsRecomend
        }
    }
} 



module.exports = router;
