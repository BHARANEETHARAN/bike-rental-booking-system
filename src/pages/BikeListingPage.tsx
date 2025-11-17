import { useState } from 'react';
import { Filter } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Card } from '../components/ui/card';

export default function BikeListingPage() {
  const { bikes } = useBooking();
  const [filterType, setFilterType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [showFilters, setShowFilters] = useState(false);

  const filteredBikes = bikes.filter((bike) => {
    const typeMatch = filterType === 'all' || bike.type === filterType;
    const priceMatch = bike.pricePerHour <= maxPrice;
    return typeMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">Available Bikes</h1>
          <p className="text-gray-600 text-lg">Choose the perfect bike for your adventure</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="md:hidden mb-4 w-full bg-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          <Card className={`p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg ${showFilters || 'hidden md:block'}`}>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Bike Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Gear">Gear</SelectItem>
                    <SelectItem value="Non-Gear">Non-Gear</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">
                  Max Price: ₹{maxPrice}/hour
                </label>
                <Slider
                  value={[maxPrice]}
                  onValueChange={(value) => setMaxPrice(value[0])}
                  min={50}
                  max={350}
                  step={25}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹50</span>
                  <span>₹350</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setFilterType('all');
                  setMaxPrice(30);
                }}
                className="bg-white"
              >
                Reset Filters
              </Button>
              <p className="text-gray-600">
                Showing {filteredBikes.length} of {bikes.length} bikes
              </p>
            </div>
          </Card>
        </div>

        {/* Bikes Grid */}
        {filteredBikes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No bikes found matching your filters. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
