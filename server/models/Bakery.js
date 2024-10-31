const mongoose = require('mongoose');

const BakerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // List of products
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // List of order IDs
});

module.exports = mongoose.model('Bakery', BakerySchema);