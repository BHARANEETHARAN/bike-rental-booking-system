import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BikeListingPage from './pages/BikeListingPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/bikes" element={<BikeListingPage />} />
              <Route 
                path="/booking/:id" 
                element={
                  <AuthGuard>
                    <BookingPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/my-bookings" 
                element={
                  <AuthGuard>
                    <MyBookingsPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <AuthGuard>
                    <AdminPage />
                  </AuthGuard>
                } 
              />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            </Routes>
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}
