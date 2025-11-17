const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      bikeId,
      bikeName,
      bikeType,
      customerName,
      phone,
      address,
      license,
      date,
      startTime,
      endTime,
      pricePerHour
    } = req.body;

    // Calculate total amount (simple calculation based on hours)
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const hours = Math.ceil((end - start) / (1000 * 60 * 60));
    const totalAmount = hours * pricePerHour;

    const booking = new Booking({
      userId: req.user.id,
      bikeId,
      bikeName,
      bikeType,
      customerName,
      phone,
      address,
      license,
      date,
      startTime,
      endTime,
      pricePerHour,
      totalAmount
    });

    await booking.save();
    res.status(201).json({ booking, message: 'Booking created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings (admin route - could be secured further)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();
    
    res.json({ booking, message: 'Booking status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;