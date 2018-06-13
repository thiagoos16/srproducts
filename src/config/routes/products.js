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

module.exports = router;
