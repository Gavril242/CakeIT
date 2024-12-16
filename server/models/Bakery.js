const mongoose = require('mongoose');

const BakerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  passwordHashed: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rating: { type: Number },
  imageUrl: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.model('Bakery', BakerySchema);
