import { Calendar, Clock, DollarSign, MapPin, Phone } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function MyBookingsPage() {
  const { bookings, loading } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600 text-lg">View and manage your bike rental bookings</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <Card className="p-12 text-center bg-white shadow-lg border-0">
            <p className="text-gray-600 text-lg">You have no bookings yet.</p>
            <p className="text-gray-500 mt-2">Start exploring our bikes and make your first booking!</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left Section - Bike & Customer Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-1">{booking.bikeName}</h3>
                        <Badge className={`${getStatusColor(booking.status)} text-white border-0`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {booking.bikeType}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 text-purple-600" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{booking.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Booking Details */}
                  <div className="lg:w-80 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-gray-900">
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-gray-900">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Rate</p>
                        <p className="text-gray-900">₹{booking.pricePerHour}/hour</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Additional Info */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">Customer:</span> {booking.customerName}
                  </div>
                  <div>
                    <span className="text-gray-500">License:</span> {booking.license}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
