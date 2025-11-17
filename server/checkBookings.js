const mongoose = require('mongoose');
require('dotenv').config();
const Booking = require('./models/Booking.js');

async function checkBookings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const bookings = await Booking.find({}).limit(10);
    console.log(`📊 Total bookings found: ${bookings.length}`);
    
    if (bookings.length > 0) {
      console.log('\n📋 Recent booking data:');
      bookings.forEach((booking, index) => {
        console.log(`\n--- Booking ${index + 1} ---`);
        console.log(`🚴 Bike Name: ${booking.bikeName}`);
        console.log(`👤 Customer Name: ${booking.customerName}`);
        console.log(`📱 Phone: ${booking.phone}`);
        console.log(`🆔 License: ${booking.license}`);
        console.log(`📅 Date: ${booking.date}`);
        console.log(`💰 Total Amount: ₹${booking.totalAmount}`);
        console.log(`⏰ Time: ${booking.startTime} - ${booking.endTime}`);
        console.log(`📍 Address: ${booking.address}`);
        console.log(`📊 Status: ${booking.status}`);
      });
    } else {
      console.log('🔍 No bookings found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkBookings();