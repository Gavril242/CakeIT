const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  bakeryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bakery',
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true, // Store product name to avoid issues if the product is later deleted
      },
      price: {
        type: Number,
        required: true, // Store product price at the time of order to account for price changes
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0, // Ensure the total price is not negative
  },
  transportCost: {
    type: Number,
    required: true,
    min: 0, // Add transport cost to store it separately from product prices
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  pickupOption: {
    type: String,
    enum: ['in-store', 'easybox', 'delivery'],
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: function () {
      return this.pickupOption === 'delivery';
    }, // Only required if pickupOption is 'delivery'
  },
  notes: {
    type: String,
    maxlength: 500, // Allow clients to add optional notes to their order
  },
});

module.exports = mongoose.model('Order', OrderSchema);
