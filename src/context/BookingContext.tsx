import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { API_BOOKINGS_URL } from '../config/api';

export interface Bike {
  id: number;
  name: string;
  type: 'Gear' | 'Non-Gear';
  pricePerHour: number;
  image: string;
  description: string;
}

export interface Booking {
  id: string;
  bikeId: number;
  bikeName: string;
  bikeType: string;
  customerName: string;
  phone: string;
  address: string;
  license: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  pricePerHour: number;
  totalAmount: number;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'totalAmount'>) => Promise<void>;
  bikes: Bike[];
  loading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

const API_BASE_URL = API_BOOKINGS_URL;

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);

  // Default bikes array
  const defaultBikes: Bike[] = [
    {
      id: 1,
      name: 'Royal Enfield Classic',
      type: 'Gear',
      pricePerHour: 300,
      image: 'https://images.unsplash.com/photo-1605008634123-2e8bee8a4a54?q=80&w=800&auto=format&fit=crop',
      description: 'Iconic vintage style bike with thumping 350cc engine',
    },
    {
      id: 2,
      name: 'Royal Enfield GT 650',
      type: 'Gear',
      pricePerHour: 400,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
      description: 'Premium twin-cylinder cafe racer with 650cc power',
    },
    {
      id: 3,
      name: 'Honda Scooty',
      type: 'Non-Gear',
      pricePerHour: 80,
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=800&auto=format&fit=crop',
      description: 'Lightweight and easy-to-ride scooter for city commuting',
    },
    {
      id: 4,
      name: 'Hero Splendor',
      type: 'Gear',
      pricePerHour: 120,
      image: 'https://images.unsplash.com/photo-1558649092-b3b93e2c8c0a?q=80&w=800&auto=format&fit=crop',
      description: 'Most trusted commuter bike with excellent mileage',
    },
    {
      id: 5,
      name: 'Bajaj NS 200',
      type: 'Gear',
      pricePerHour: 250,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop',
      description: 'Sporty naked bike with powerful 200cc engine',
    },
    {
      id: 6,
      name: 'TVS Scooty Pep+',
      type: 'Non-Gear',
      pricePerHour: 70,
      image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=800&auto=format&fit=crop',
      description: 'Affordable and reliable scooter perfect for daily use',
    },
    {
      id: 7,
      name: 'Honda Activa',
      type: 'Non-Gear',
      pricePerHour: 100,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
      description: 'India\'s most popular automatic scooter with great comfort',
    },
    {
      id: 8,
      name: 'Ola Electric S1',
      type: 'Non-Gear',
      pricePerHour: 150,
      image: 'https://images.unsplash.com/photo-1609630875143-3a4b3f7b2b00?q=80&w=800&auto=format&fit=crop',
      description: 'Modern electric scooter with smart features and zero emissions',
    },
  ];

  // Load bikes from localStorage if admin has modified them, otherwise use defaults
  useEffect(() => {
    const loadBikes = () => {
      const savedBikes = localStorage.getItem('adminBikes');
      if (savedBikes) {
        try {
          const parsed: Bike[] = JSON.parse(savedBikes);

          // Migration: replace placeholder image entries (e.g. '/images/all-bikes.jpg')
          // with per-bike web images so existing admin-saved bikes update visually.
          const mapping: Record<string, string> = {
            'Royal Enfield Classic': 'https://images.unsplash.com/photo-1605008634123-2e8bee8a4a54?q=80&w=800&auto=format&fit=crop',
            'Royal Enfield GT 650': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
            'Honda Scooty': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=800&auto=format&fit=crop',
            'Hero Splendor': 'https://images.unsplash.com/photo-1558649092-b3b93e2c8c0a?q=80&w=800&auto=format&fit=crop',
            'Bajaj NS 200': 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop',
            'TVS Scooty Pep+': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=800&auto=format&fit=crop',
            'Honda Activa': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
            'Ola Electric S1': 'https://images.unsplash.com/photo-1609630875143-3a4b3f7b2b00?q=80&w=800&auto=format&fit=crop',
          };

          let migrated = false;
          const updated = parsed.map(b => {
            if (!b.image || b.image.includes('all-bikes')) {
              const replacement = mapping[b.name];
              if (replacement) {
                migrated = true;
                return { ...b, image: replacement };
              }
            }
            return b;
          });

          if (migrated) {
            localStorage.setItem('adminBikes', JSON.stringify(updated));
          }

          setBikes(JSON.parse(localStorage.getItem('adminBikes') || JSON.stringify(updated)));
        } catch (e) {
          console.error('Failed to parse saved bikes, falling back to defaults', e);
          setBikes(defaultBikes);
          localStorage.setItem('adminBikes', JSON.stringify(defaultBikes));
        }
      } else {
        setBikes(defaultBikes);
        // Save default bikes to localStorage for consistency
        localStorage.setItem('adminBikes', JSON.stringify(defaultBikes));
      }
    };

    // Load bikes initially
    loadBikes();

    // Listen for bike updates from admin panel
    const handleBikesUpdate = (event: CustomEvent) => {
      setBikes(event.detail);
    };

    window.addEventListener('bikesUpdated', handleBikesUpdate as EventListener);
    
    // Also listen for localStorage changes (for cross-tab updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'adminBikes' && event.newValue) {
        setBikes(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('bikesUpdated', handleBikesUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fetch bookings from backend
  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const fetchBookings = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (booking: Omit<Booking, 'id' | 'status' | 'totalAmount'>) => {
    if (!token) {
      throw new Error('You must be logged in to make a booking');
    }

    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      // Add the new booking to local state
      setBookings(prev => [data.booking, ...prev]);
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, bikes, loading }}>
      {children}
    </BookingContext.Provider>
  );
};
