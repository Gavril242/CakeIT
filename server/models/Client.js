const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    name: String,
    phone: String,
    address: {
      street: String,
      city: String,
      zip: String
    }
  },
  preferences: {
    favoriteBakeries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bakery' }],
    notificationPreferences: Object
  }
});

module.exports = mongoose.model('Client', ClientSchema);