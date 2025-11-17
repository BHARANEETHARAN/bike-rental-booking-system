
# 🚴‍♂️ Smart Bike Rental Booking System

A modern, full-stack bike rental application built with React + TypeScript frontend and Express + MongoDB backend. Features user authentication, secure booking management, and a responsive design.

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure account creation with email validation
- **JWT Authentication** - Token-based session management
- **Protected Routes** - Booking features require authentication
- **Password Security** - Bcrypt hashing for password protection

### 🚲 Bike Management
- **Bike Catalog** - Browse available bikes with detailed information
- **Bike Categories** - Gear and Non-gear bike options
- **Pricing Display** - Transparent hourly rental rates
- **High-Quality Images** - Visual bike showcase

### 📅 Booking System
- **Real-time Booking** - Instant booking confirmation
- **Booking Validation** - Date, time, and form validation
- **Booking History** - View all your past and upcoming bookings
- **Status Management** - Track booking status (upcoming, completed, cancelled)
- **MongoDB Storage** - All booking data persisted to database

### 🎨 User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, gradient-based design with Tailwind CSS
- **Loading States** - Visual feedback during operations
- **Toast Notifications** - Real-time success/error messages
- **Intuitive Navigation** - Easy-to-use interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Bike Rental Booking System"
```

### 2. Setup Backend
```bash
cd server
npm install

# Setup environment variables
Copy-Item .\.env.example .\.env
# Edit .env with your MongoDB URI and JWT secret

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd ..  # Go back to root directory
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Environment Variables

Create `server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/bikerental
JWT_SECRET=your_super_secure_jwt_secret_here
PORT=5000
```

## 📋 Usage Guide

### 1. **Registration & Login**
   - Visit the application
   - Click "Register" to create a new account
   - Fill in your name, email, and password
   - Or login with existing credentials

### 2. **Browse Bikes**
   - Navigate to "Bikes" section
   - View available bikes with details
   - See pricing and bike specifications

### 3. **Make a Booking**
   - Click "Book Now" on any bike
   - **Authentication Required** - You'll be redirected to login if not authenticated
   - Fill in booking details:
     - Customer information
     - Phone number and address
     - Driver's license number
     - Booking date and time
   - Confirm booking

### 4. **Manage Bookings**
   - Go to "My Bookings" (requires login)
   - View all your bookings
   - See booking status and details
   - Track upcoming and completed rentals

## 🔧 API Documentation

### Authentication Endpoints
```bash
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Booking Endpoints (Protected)
```bash
POST   /api/bookings          # Create booking
GET    /api/bookings          # Get user bookings
GET    /api/bookings/all      # Get all bookings (admin)
PATCH  /api/bookings/:id/status # Update booking status
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt with salt rounds
- **Protected Routes** - Frontend and backend route protection
- **Input Validation** - Form validation and sanitization
- **CORS Configuration** - Controlled cross-origin requests

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 🖥️ **Desktop** - Full featured experience
- 📱 **Mobile** - Touch-optimized interface
- 📱 **Tablet** - Adaptive layout

## 🎯 Key Authentication Flow

1. **User visits booking page** → Redirected to login if not authenticated
2. **User registers/logs in** → Receives JWT token
3. **Token stored in localStorage** → Automatically included in API calls
4. **Protected API calls** → Backend validates JWT token
5. **User can make bookings** → Data saved to MongoDB with user ID

## 🚫 Access Control

- **Public Pages**: Home, Bikes, Login, Register
- **Protected Pages**: Booking, My Bookings
- **Protected API**: All booking endpoints require valid JWT
- **Data Isolation**: Users can only see their own bookings

## 🛠️ Development

### Backend Development
```bash
cd server
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
npm run dev  # Starts Vite dev server with hot reload
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
npm start
```

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  bikeId: Number,
  bikeName: String,
  bikeType: String,
  customerName: String,
  phone: String,
  address: String,
  license: String,
  date: String,
  startTime: String,
  endTime: String,
  pricePerHour: Number,
  totalAmount: Number,
  status: String,
  createdAt: Date
}
```

## 🔮 Future Enhancements

- **Payment Integration** - Stripe/PayPal integration
- **Email Notifications** - Booking confirmations via email
- **Bike Availability** - Real-time availability tracking
- **Admin Dashboard** - Bike and booking management
- **Rating System** - User reviews and ratings
- **Location Services** - GPS-based bike locations
- **Mobile App** - React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email [your-email@example.com] or create an issue in the repository.

---

**Made with ❤️ for the biking community**
  