const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  bakeryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bakery', required: true },
  name: { type: String, required: true },
  description: String,
  price: Number,
  customOptions: {
    size: [String],      // e.g., ['small', 'medium', 'large']
    flavors: [String],   // e.g., ['vanilla', 'chocolate']
    decorations: [String] // e.g., ['text', 'image', 'custom']
  },
  availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);