var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db_products');

var productSchema =new mongoose.Schema({
    businessId: { type: Number, required: true },
    name: { type: String, required:true },
    imageName: { type: String, required:true },
    detailUrl: { type: String, required:true },
    price: { type: String, required:true },
    oldPrice: { type: String, required:true },
    category: { type: String, required:true },
    productInfo: {
        paymentConditions: { type: String, required:true }      
    }
}, { collection: 'products' }
);

module.exports = {Mongoose: mongoose, ProductSchema: productSchema}
