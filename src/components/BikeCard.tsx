import { Link, useNavigate } from 'react-router-dom';
import { Clock, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Bike } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    if (isAuthenticated) {
      navigate(`/booking/${bike.id}`);
    } else {
      navigate('/login');
    }
  };
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            className={`${
              bike.type === 'Gear' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-500'
            } text-white border-0`}
          >
            <Settings className="h-3 w-3 mr-1" />
            {bike.type}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="text-gray-900">{bike.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{bike.description}</p>
        
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="h-4 w-4 text-purple-600" />
          <span className="text-purple-600">₹{bike.pricePerHour}/hour</span>
        </div>
        
        <Button 
          onClick={handleBookNowClick}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}
