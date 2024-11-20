// const mongoose = require('mongoose');
// require('dotenv').config();
//
// // Import models
// const Client = require('./models/Client');
// const Bakery = require('./models/Bakery');
// const Product = require('./models/Product');
// const Order = require('./models/Order');
// const EasyboxReservation = require('./models/EasyBoxReservation');
//
// // MongoDB connection URI
// const uri = process.env.MONGO_URI || "mongodb+srv://cakeitadminuser:FZUoxyyxQe1UCGcO@cluster0.idwnz.mongodb.net/cakeit?retryWrites=true&w=majority";
//
// mongoose.connect(uri)
//   .then(() => {
//     console.log("MongoDB connected");
//     seedDatabase(); // Call the seed function after connecting
//   })
//   .catch(err => {
//     console.log("MongoDB connection error:", err.message);
//   });
//
// // Seed function
// async function seedDatabase() {
//   try {
//     // Insert one document into each collection to create the collections
//     await Client.create({ username: 'testuser', email: 'test@example.com', passwordHash: 'hashedPassword' });
//     await Bakery.create({ name: 'Test Bakery', location: '123 Bakery St', description: 'A lovely bakery' });
//     await Product.create({ bakeryId: '62c5d5f76c8f7e3a1e6e5678', name: 'Test Cake', price: 15 });
//     await Order.create({ clientId: '62c5d4f56c8f7e3a1e6e1234', bakeryId: '62c5d5f76c8f7e3a1e6e5678', products: [{ productId: '62c5d6f26c8f7e3a1e6e9101', quantity: 2 }] });
//     await EasyboxReservation.create({ orderId: '62c5d7f56c8f7e3a1e6e2345', reservationDate: new Date(), timeSlot: '10:00 - 12:00' });
//
//     console.log("Data seeded successfully!");
//   } catch (error) {
//     console.error("Error seeding data:", error.message);
//   } finally {
//     mongoose.connection.close();
//   }
// }