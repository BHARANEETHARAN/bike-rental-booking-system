import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, User, Phone, MapPin, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bikes, addBooking, loading: bookingLoading } = useBooking();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const bike = bikes.find((b) => b.id === Number(id));

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    phone: '',
    address: '',
    license: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Bike not found</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.customerName || !formData.phone || !formData.address || 
        !formData.license || !formData.date || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Please select a future date');
      return;
    }

    // Validate time range
    if (formData.startTime >= formData.endTime) {
      toast.error('End time must be after start time');
      return;
    }

    setLoading(true);
    try {
      // Add booking through context which calls the backend
      await addBooking({
        bikeId: bike.id,
        bikeName: bike.name,
        bikeType: bike.type,
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        license: formData.license,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        pricePerHour: bike.pricePerHour,
      });

      toast.success('Booking confirmed successfully!');
      navigate('/my-bookings');
    } catch (error: any) {
      toast.error(error.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-gray-900 text-center mb-12">Complete Your Booking</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bike Details Card */}
          <Card className="p-6 bg-white shadow-xl border-0 h-fit sticky top-24">
            <h3 className="text-gray-900 mb-4">Selected Bike</h3>
            
            <div className="rounded-lg overflow-hidden mb-4">
              <ImageWithFallback
                src={bike.image}
                alt={bike.name}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-gray-900">{bike.name}</h2>
              <p className="text-gray-600">{bike.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-gray-600">Type:</span>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm">
                  {bike.type}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price per hour:</span>
                <span className="text-purple-600">₹{bike.pricePerHour}</span>
              </div>
            </div>
          </Card>

          {/* Booking Form */}
          <Card className="p-8 bg-white shadow-xl border-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="customerName" className="text-gray-700">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="pl-10 bg-gray-50 border-gray-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 bg-gray-50 border-gray-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-700">Address</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 bg-gray-50 border-gray-200"
                    placeholder="123 Main Street"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="license" className="text-gray-700">License Number</Label>
                <div className="relative mt-1">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="license"
                    name="license"
                    type="text"
                    required
                    value={formData.license}
                    onChange={handleChange}
                    className="pl-10 bg-gray-50 border-gray-200"
                    placeholder="DL123456789"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="date" className="text-gray-700">Booking Date</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="pl-10 bg-gray-50 border-gray-200"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="text-gray-700">Start Time</Label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={handleChange}
                      className="pl-10 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="endTime" className="text-gray-700">End Time</Label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      required
                      value={formData.endTime}
                      onChange={handleChange}
                      className="pl-10 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || bookingLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 mt-8 disabled:opacity-50"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
