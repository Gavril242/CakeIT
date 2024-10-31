const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  bakeryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bakery', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'completed'], default: 'pending' },
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  pickupOption: { type: String, enum: ['in-store', 'easybox', 'delivery'] }
});

module.exports = mongoose.model('Order', OrderSchema);