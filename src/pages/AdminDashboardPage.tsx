import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Bike, 
  Calendar, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  LogOut,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';
import { API_BOOKINGS_URL } from '../config/api';

interface AdminBooking {
  _id: string;
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
  userId: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface BikeData {
  id: number;
  name: string;
  type: 'Gear' | 'Non-Gear';
  pricePerHour: number;
  image: string;
  description: string;
}

interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  activeBookings: number;
  totalUsers: number;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalBookings: 0,
    totalRevenue: 0,
    activeBookings: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [editingBike, setEditingBike] = useState<BikeData | null>(null);
  const [isAddingBike, setIsAddingBike] = useState(false);
  const [newBike, setNewBike] = useState<Omit<BikeData, 'id'>>({
    name: '',
    type: 'Gear',
    pricePerHour: 0,
    image: '',
    description: ''
  });

  // Check admin authentication
  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminUser || !adminToken) {
      navigate('/admin-login');
      return;
    }

    const user = JSON.parse(adminUser);
    if (user.email !== 'bharanipt2006@gmail.com') {
      navigate('/admin-login');
      return;
    }

    fetchAdminData();
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch bookings from backend
      const token = localStorage.getItem('token'); // Regular user token for API calls
      if (token) {
        const response = await fetch(`${API_BOOKINGS_URL}/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings);
          
          // Calculate stats
          const totalBookings = data.bookings.length;
          const totalRevenue = data.bookings.reduce((sum: number, booking: AdminBooking) => sum + booking.totalAmount, 0);
          const activeBookings = data.bookings.filter((booking: AdminBooking) => booking.status === 'upcoming').length;
          const uniqueUsers = new Set(data.bookings.map((booking: AdminBooking) => booking.userId.email)).size;
          
          setStats({
            totalBookings,
            totalRevenue,
            activeBookings,
            totalUsers: uniqueUsers
          });
        }
      }

      // Load bikes from context (since we'll modify the static data)
      const defaultBikes: BikeData[] = [
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
          image: 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/royal-enfield-select-model-british-racing-green-1668419802695.jpg?q=80',
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

      // Load from localStorage if available, otherwise use defaults and save them
      const savedBikes = localStorage.getItem('adminBikes');
      if (savedBikes) {
        setBikes(JSON.parse(savedBikes));
      } else {
        setBikes(defaultBikes);
        localStorage.setItem('adminBikes', JSON.stringify(defaultBikes));
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const saveBikesToStorage = (updatedBikes: BikeData[]) => {
    localStorage.setItem('adminBikes', JSON.stringify(updatedBikes));
    setBikes(updatedBikes);
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('bikesUpdated', { 
      detail: updatedBikes 
    }));
    
    toast.success('Bike fleet updated! Changes are now live on the website.');
  };

  const handleAddBike = () => {
    if (!newBike.name || !newBike.pricePerHour || !newBike.image || !newBike.description) {
      toast.error('Please fill all required fields');
      return;
    }

    if (newBike.pricePerHour <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    const maxId = Math.max(...bikes.map(bike => bike.id), 0);
    const bikeToAdd: BikeData = {
      ...newBike,
      id: maxId + 1
    };

    const updatedBikes = [...bikes, bikeToAdd];
    saveBikesToStorage(updatedBikes);
    
    toast.success(`🚴 ${newBike.name} added to your fleet!`);
    setIsAddingBike(false);
    setNewBike({
      name: '',
      type: 'Gear',
      pricePerHour: 0,
      image: '',
      description: ''
    });
  };

  const handleEditBike = (bike: BikeData) => {
    if (!bike.name || !bike.pricePerHour || !bike.image || !bike.description) {
      toast.error('Please fill all required fields');
      return;
    }

    if (bike.pricePerHour <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    const updatedBikes = bikes.map(b => b.id === bike.id ? bike : b);
    saveBikesToStorage(updatedBikes);
    
    toast.success(`✅ ${bike.name} updated successfully!`);
    setEditingBike(null);
  };

  const handleDeleteBike = (bikeId: number) => {
    const bikeToDelete = bikes.find(bike => bike.id === bikeId);
    if (confirm(`Are you sure you want to delete "${bikeToDelete?.name}" from your fleet?\n\nThis action cannot be undone.`)) {
      const updatedBikes = bikes.filter(bike => bike.id !== bikeId);
      saveBikesToStorage(updatedBikes);
      toast.success(`🗑️ ${bikeToDelete?.name} removed from fleet`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-8 w-8 text-red-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Bike Rental Management System</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bikes</CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bikes.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bike Management Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">🚴 Bike Fleet Management</CardTitle>
                <CardDescription>Manage your bike inventory - add, edit, or remove bikes from your fleet</CardDescription>
              </div>
              <Dialog open={isAddingBike} onOpenChange={setIsAddingBike}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Bike
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-green-700 flex items-center gap-2">
                      <Plus className="h-6 w-6" />
                      Add New Bike to Fleet
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Bike Name *</Label>
                        <Input
                          value={newBike.name}
                          onChange={(e) => setNewBike({...newBike, name: e.target.value})}
                          placeholder="e.g., Royal Enfield Classic 350"
                          className="mt-1 border-2 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Bike Type *</Label>
                        <Select value={newBike.type} onValueChange={(value: 'Gear' | 'Non-Gear') => setNewBike({...newBike, type: value})}>
                          <SelectTrigger className="mt-1 border-2 focus:border-green-500">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gear">🏍️ Gear (Manual)</SelectItem>
                            <SelectItem value="Non-Gear">🛵 Non-Gear (Automatic)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Price per Hour (₹) *</Label>
                      <Input
                        type="number"
                        value={newBike.pricePerHour}
                        onChange={(e) => setNewBike({...newBike, pricePerHour: Number(e.target.value)})}
                        placeholder="Enter hourly rate"
                        className="mt-1 border-2 focus:border-green-500"
                        min="1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Image URL *</Label>
                      <Input
                        value={newBike.image}
                        onChange={(e) => setNewBike({...newBike, image: e.target.value})}
                        placeholder="https://example.com/bike-image.jpg"
                        className="mt-1 border-2 focus:border-green-500"
                      />
                      {newBike.image && (
                        <div className="mt-2 p-2 border rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-600 mb-1">Preview:</p>
                          <img src={newBike.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Description *</Label>
                      <Input
                        value={newBike.description}
                        onChange={(e) => setNewBike({...newBike, description: e.target.value})}
                        placeholder="Brief description of the bike features"
                        className="mt-1 border-2 focus:border-green-500"
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={handleAddBike} 
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Add Bike to Fleet
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingBike(false)} 
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike) => (
                <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2">
                  <div className="relative">
                    <img src={bike.image} alt={bike.name} className="w-full h-48 object-cover" />
                    <Badge 
                      className={`absolute top-2 right-2 ${bike.type === 'Gear' ? 'bg-blue-600' : 'bg-purple-600'}`}
                    >
                      {bike.type === 'Gear' ? '🏍️ Gear' : '🛵 Auto'}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    {editingBike?.id === bike.id ? (
                      <div className="space-y-3">
                        <Input
                          value={editingBike.name}
                          onChange={(e) => setEditingBike({...editingBike, name: e.target.value})}
                          className="font-semibold border-2 focus:border-blue-500"
                          placeholder="Bike name"
                        />
                        <Select value={editingBike.type} onValueChange={(value: 'Gear' | 'Non-Gear') => setEditingBike({...editingBike, type: value})}>
                          <SelectTrigger className="border-2 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gear">🏍️ Gear</SelectItem>
                            <SelectItem value="Non-Gear">🛵 Non-Gear</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={editingBike.pricePerHour}
                          onChange={(e) => setEditingBike({...editingBike, pricePerHour: Number(e.target.value)})}
                          className="border-2 focus:border-blue-500"
                          placeholder="Price per hour"
                        />
                        <Input
                          value={editingBike.image}
                          onChange={(e) => setEditingBike({...editingBike, image: e.target.value})}
                          className="border-2 focus:border-blue-500"
                          placeholder="Image URL"
                        />
                        <Input
                          value={editingBike.description}
                          onChange={(e) => setEditingBike({...editingBike, description: e.target.value})}
                          className="border-2 focus:border-blue-500"
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditBike(editingBike)}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingBike(null)}
                            className="flex-1 border-gray-300"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-gray-800">{bike.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-green-600">₹{bike.pricePerHour}</span>
                          <span className="text-sm text-gray-500">/hour</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{bike.description}</p>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingBike(bike)}
                            className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteBike(bike.id)}
                            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {bikes.length === 0 && (
              <div className="text-center py-12">
                <Bike className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No bikes in your fleet</p>
                <p className="text-gray-400 mb-4">Add your first bike to get started</p>
                <Button onClick={() => setIsAddingBike(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Bike
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}