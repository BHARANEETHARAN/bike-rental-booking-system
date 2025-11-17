import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bike, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bikes', path: '/bikes' },
    ...(isAuthenticated ? [{ name: 'My Bookings', path: '/my-bookings' }] : []),
    ...(isAuthenticated && user?.email === 'admin@demo.com' ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Bike className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-semibold text-xl hidden sm:inline">SmartBike Rentals</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg ${
                  location.pathname === link.path ? 'bg-white/20 text-white' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-white">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Welcome, {user?.name}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-purple-600 hover:bg-white/90">
                    Register
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white text-xs">
                    Admin
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white/90 hover:text-white hover:bg-white/10 transition-colors px-4 py-2 rounded-lg ${
                  location.pathname === link.path ? 'bg-white/20 text-white' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="text-white text-center py-2">
                    <User className="h-4 w-4 mx-auto mb-1" />
                    <span className="text-sm">Welcome, {user?.name}</span>
                  </div>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost" 
                    className="w-full text-white hover:bg-white/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-white hover:bg-white/20">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
                      Register
                    </Button>
                  </Link>
                  <Link to="/admin-login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-white hover:bg-white/20 text-sm">
                      Admin Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
