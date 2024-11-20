const mongoose = require('mongoose');

const BakerySchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Correct type is Number, not int
  name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  rating: { type: Number }, // Rating should be a Number
  imageUrl: { type: String }, // Fix syntax error (replace `;` with `:`)
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // List of product IDs
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // List of order IDs
});

module.exports = mongoose.model('Bakery', BakerySchema);