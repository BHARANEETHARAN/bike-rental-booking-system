const dotenv = require('dotenv');
const path = require('path');
// Try to load .env; if it's missing, try .env.example as a fallback to help devs
const envResult = dotenv.config();
if (envResult.error) {
  const examplePath = path.join(__dirname, '.env.example');
  const exampleResult = dotenv.config({ path: examplePath });
  if (!exampleResult || exampleResult.error) {
    console.warn('No .env file found and failed to load .env.example; proceeding with process.env variables');
  } else {
    console.log('Loaded environment from .env.example (no .env present)');
  }
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('Fatal: MONGO_URI is not defined. Create a .env file from .env.example and set MONGO_URI.');
  console.error('Example: Copy .env.example to .env and edit values:');
  console.error('  Copy-Item .\\env.example .\\.env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send({ ok: true, message: 'Bike rental backend' });
});
