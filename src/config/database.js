var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db_products');

module.exports = {Mongoose: mongoose}
