var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/*GET all products. */
router.get('/products', function (req, res, next){
    var db = require('../database');
    var Products = db.Mongoose.model('products', db.ProductSchema);
    Products.find({}).lean().exec(function(e, docs) {
        res.json(docs);
        res.end();
    });
});
