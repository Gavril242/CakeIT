const EasyboxReservation = require('../models/EasyboxReservation');

// Reserve Easybox slot
const reserveEasybox = async (req, res) => {
    const { orderId, reservationDate, timeSlot, slotNumber } = req.body;

    try {
        const password = Math.random().toString(36).slice(-8); // Generate a random password
        const reservation = new EasyboxReservation({
            orderId,
            reservationDate,
            timeSlot,
            slotNumber,
            password,
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Open Easybox
const openEasybox = async (req, res) => {
    const { orderId, password } = req.body;

    try {
        const reservation = await EasyboxReservation.findOne({ orderId, password });
        if (!reservation) return res.status(400).json({ message: 'Invalid order ID or password' });

        res.status(200).json({ message: 'Easybox opened successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Close Easybox
const closeEasybox = async (req, res) => {
    const { orderId } = req.body;

    try {
        const reservation = await EasyboxReservation.findOne({ orderId });
        if (!reservation) return res.status(400).json({ message: 'Reservation not found' });

        res.status(200).json({ message: 'Easybox closed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { reserveEasybox, openEasybox, closeEasybox };
