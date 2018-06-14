var db = require('../config/database');

var productSchema = new db.Mongoose.Schema({
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

// var recommendationListSchema = new db.Mongoose.Schema({
//     reference: {
//         timestamp: Date.now,
//         item: productSchema
//     },
//     recommendation: [
//         productSchema
//     ]    
// });

module.exports = { ProductSchema: productSchema }