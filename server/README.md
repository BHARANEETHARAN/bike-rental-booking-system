# Bike Rental Backend

Express + MongoDB backend for the Bike Rental Booking System with authentication and booking management.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected booking endpoints
- MongoDB integration for data persistence
- CORS enabled for frontend integration

## Setup

1. **Environment Variables**: Copy `.env.example` to `.env` and update values:
   ```
   Copy-Item .\.env.example .\.env
   ```
   
   Edit `.env` with your MongoDB connection string and JWT secret:
   ```
   MONGO_URI=mongodb://localhost:27017/bikerental
   # Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/bikerental
   JWT_SECRET=your_super_secure_jwt_secret_here
   PORT=5000
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run Development Server**:
   ```
   npm run dev
   ```
   
   Or for production:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
  - Returns: `{ "user": {...}, "token": "jwt_token" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "john@example.com", "password": "password123" }`
  - Returns: `{ "user": {...}, "token": "jwt_token" }`

- `GET /api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "user": {...} }`

### Bookings (All require authentication)
- `POST /api/bookings` - Create new booking
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "bikeId": 1, "bikeName": "Mountain Pro X1", ... }`
  - Returns: `{ "booking": {...}, "message": "Booking created successfully" }`

- `GET /api/bookings` - Get user's bookings
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "bookings": [...] }`

- `GET /api/bookings/all` - Get all bookings (admin)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "bookings": [...] }`

- `PATCH /api/bookings/:id/status` - Update booking status
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "status": "completed" }`
  - Returns: `{ "booking": {...}, "message": "Booking status updated" }`

## Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

### Booking Collection
```javascript
{
  userId: ObjectId (ref: User, required),
  bikeId: Number (required),
  bikeName: String (required),
  bikeType: String (required),
  customerName: String (required),
  phone: String (required),
  address: String (required),
  license: String (required),
  date: String (required),
  startTime: String (required),
  endTime: String (required),
  pricePerHour: Number (required),
  totalAmount: Number (required, calculated),
  status: String (enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming'),
  createdAt: Date (default: now)
}
```

## Frontend Integration

The frontend should send requests to `http://localhost:5000` (or your deployed backend URL). Example fetch calls:

```javascript
// Register
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});

// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// Create booking (with auth token)
const response = await fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(bookingData)
});
```

## Security Notes

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire in 7 days
- CORS is currently open for development - restrict in production
- Use HTTPS in production
- Store JWT_SECRET securely (environment variables/secret manager)
- Consider rate limiting for production deployment
