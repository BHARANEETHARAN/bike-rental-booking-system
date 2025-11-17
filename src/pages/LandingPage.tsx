import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import BikeCard from '../components/BikeCard';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { bikes } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const featuredBikes = bikes.slice(0, 3);

  const handleBookRideClick = () => {
    if (isAuthenticated) {
      navigate('/bikes');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511264568880-afe3b1951e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjBtb3Rpb258ZW58MXx8fHwxNzU5OTEzMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/80 to-cyan-900/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl mb-6 font-bold">
            Velan Motors
          </h1>
          <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Explore the city on your terms. Rent premium bikes by the hour with SmartBike.
          </p>
          <Button 
            onClick={handleBookRideClick}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-2xl"
          >
            Book Your Ride Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-900 mb-12">Why Choose SmartBike?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3">Instant Booking</h3>
              <p className="text-gray-600">Book your bike in seconds and start riding immediately</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3">Safe & Secure</h3>
              <p className="text-gray-600">All bikes are regularly maintained and insured</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3">Flexible Hours</h3>
              <p className="text-gray-600">Rent by the hour with no hidden fees or charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Featured Bikes</h2>
            <p className="text-gray-600 text-lg">Choose from our premium collection of bikes</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/bikes">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full">
                View All Bikes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-white mb-12">What Our Riders Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Sarah Johnson', text: 'Best bike rental service in the city! Quick, easy, and affordable.' },
              { name: 'Mike Chen', text: 'The bikes are well-maintained and the booking process is seamless.' },
              { name: 'Emily Davis', text: 'Love the variety of bikes available. Perfect for weekend adventures!' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white mb-4">{testimonial.text}</p>
                <p className="text-white/80">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 SmartBike Rentals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
