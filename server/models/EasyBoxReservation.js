const mongoose = require('mongoose');

const EasyboxReservationSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reservationDate: { type: Date, required: true },
  timeSlot: String, // e.g., '10:00 AM - 12:00 PM'
  slotNumber: Number
});

module.exports = mongoose.model('EasyboxReservation', EasyboxReservationSchema);