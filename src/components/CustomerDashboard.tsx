import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CreditCard, 
  Download, 
  Star,
  Phone,
  CheckCircle,
  AlertCircle,
  History,
  Plus,
  Eye,
  Edit,
  X,
  Menu,
  StarIcon
} from 'lucide-react';
import { MockDatabase, User as UserType } from '../data/database';

interface CustomerDashboardProps {
  navigateTo: (page: string) => void;
  user: UserType | null;
}

export function CustomerDashboard({ navigateTo, user }: CustomerDashboardProps) {
  // State for modals and interactions
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState<any>(null);

  // Get customer data from database
  const bookings = user ? MockDatabase.getBookingsByCustomerId(user.id) : [];
  const analytics = user ? MockDatabase.getCustomerAnalytics(user.id) : null;

  // Transform bookings to match component structure
  const transformedBookings = bookings.map(booking => {
    const provider = MockDatabase.findProviderById(booking.providerId);
    const providerUser = provider ? MockDatabase.findUserById(provider.userId) : null;
    const service = MockDatabase.findServiceById(booking.serviceId);
    
    return {
      id: booking.id,
      service: service?.name || 'Unknown Service',
      provider: providerUser?.name || 'Unknown Provider',
      date: booking.scheduledDate,
      time: booking.scheduledTime,
      status: booking.status,
      price: booking.finalCost || booking.estimatedCost,
      address: booking.address
    };
  });

  // Split bookings by status
  const upcomingBookingsFromDb = transformedBookings.filter(b => 
    b.status === 'pending' || b.status === 'confirmed' || b.status === 'in-progress'
  );
  
  const bookingHistoryFromDb = transformedBookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled'
  );

  // Fallback data if no database data
  const fallbackUpcomingBookings = [
    {
      id: "BK001",
      service: "Plumbing Service",
      provider: "Ahmed Hassan",
      date: "2024-08-22",
      time: "2:00 PM - 4:00 PM",
      status: "confirmed",
      price: 500,
      address: "House 12, Road 5, Dhanmondi"
    },
    {
      id: "BK002", 
      service: "AC Repair",
      provider: "Fatima Rahman",
      date: "2024-08-25",
      time: "10:00 AM - 12:00 PM", 
      status: "pending",
      price: 800,
      address: "Apartment 3B, Gulshan 1"
    }
  ];

  const bookingHistory = [
    {
      id: "BK003",
      service: "Home Cleaning",
      provider: "Sara Khan", 
      date: "2024-08-15",
      status: "completed",
      price: 600,
      rating: 5,
      review: "Excellent service! Very thorough cleaning."
    },
    {
      id: "BK004",
      service: "Electrical Work",
      provider: "Karim Ahmed",
      date: "2024-08-10", 
      status: "completed",
      price: 350,
      rating: 4,
      review: "Good work, professional and on time."
    },
    {
      id: "BK005",
      service: "Painting",
      provider: "Nasir Uddin",
      date: "2024-08-05",
      status: "completed", 
      price: 1200,
      rating: 5,
      review: "Amazing paint job! Highly recommended."
    }
  ];

  const receipts = [
    {
      id: "RC001",
      bookingId: "BK003",
      service: "Home Cleaning",
      amount: 600,
      date: "2024-08-15",
      paymentMethod: "bKash"
    },
    {
      id: "RC002", 
      bookingId: "BK004",
      service: "Electrical Work",
      amount: 350,
      date: "2024-08-10",
      paymentMethod: "Cash"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    // In a real app, this would call an API
    console.log('Cancelling booking:', bookingId);
    setCancelBookingId(null);
  };

  const handleReschedule = (bookingId: string) => {
    // In a real app, this would call an API
    console.log('Rescheduling booking:', bookingId);
    setRescheduleBookingId(null);
  };

  const handleViewDetails = (booking: any) => {
    setSelectedJobDetails(booking);
  };

  const handleRateProvider = (bookingId: string) => {
    // In a real app, this would submit the rating
    console.log('Rating booking:', bookingId, 'with', rating, 'stars and review:', review);
    setRatingBookingId(null);
    setRating(0);
    setReview('');
  };

  const RatingComponent = ({ value, onChange }: { value: number; onChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-gray-300 hover:text-yellow-400 transition-colors btn-interactive"
          >
            <Star
              className={`h-6 w-6 ${star <= value ? 'text-yellow-400 fill-current' : ''}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Mobile Navigation */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              My Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your bookings and account information
            </p>
          </div>
          
          {/* Quick Action Button */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigateTo('booking')}
              className="bg-[#22C55E] hover:bg-[#16A249] text-white btn-interactive flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Book New Service</span>
              <span className="sm:hidden">Book Service</span>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden btn-interactive">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-6 space-y-4">
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start btn-interactive"
                      onClick={() => {
                        navigateTo('booking');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Book New Service
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start btn-interactive"
                      onClick={() => {
                        navigateTo('services');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Browse Services
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start btn-interactive"
                      onClick={() => {
                        navigateTo('providers');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Find Providers
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          {/* Responsive Tab Navigation */}
          <div className="flex flex-col space-y-4">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
              <TabsTrigger value="upcoming" className="text-xs sm:text-sm py-2 px-2 sm:px-4">
                <span className="hidden sm:inline">Upcoming Bookings</span>
                <span className="sm:hidden">Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm py-2 px-2 sm:px-4">
                <span className="hidden sm:inline">Booking History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
              <TabsTrigger value="receipts" className="text-xs sm:text-sm py-2 px-2 sm:px-4">
                Receipts
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm py-2 px-2 sm:px-4">
                Profile
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Ongoing Jobs (Upcoming Bookings) */}
          <TabsContent value="upcoming" className="space-y-6">
            {/* Responsive Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {(upcomingBookingsFromDb.length > 0 ? upcomingBookingsFromDb : fallbackUpcomingBookings).map((booking) => (
                <Card key={booking.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 truncate">
                          {booking.service}
                        </h3>
                        <p className="text-gray-600 text-sm truncate">
                          Provider: {booking.provider}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3 mb-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-[#1E3A8A]">৳{booking.price}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 line-clamp-2">
                          {booking.address}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="btn-interactive text-xs"
                            onClick={() => handleViewDetails(booking)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Job Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h4 className="font-medium mb-2">{booking.service}</h4>
                              <p className="text-sm text-gray-600">Provider: {booking.provider}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Date:</span>
                                <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Time:</span>
                                <span className="text-sm">{booking.time}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Cost:</span>
                                <span className="text-sm font-medium">৳{booking.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Status:</span>
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Address:</span>
                              <p className="text-sm mt-1">{booking.address}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={rescheduleBookingId === booking.id} onOpenChange={(open) => !open && setRescheduleBookingId(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="btn-interactive text-xs"
                            onClick={() => setRescheduleBookingId(booking.id)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Reschedule
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Reschedule Booking</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="new-date">New Date</Label>
                              <Input type="date" id="new-date" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="new-time">Preferred Time</Label>
                              <Select>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                                  <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                                  <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="reason">Reason for Reschedule</Label>
                              <Textarea id="reason" placeholder="Optional reason..." className="mt-1" />
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => handleReschedule(booking.id)}
                                className="flex-1 bg-[#1E3A8A] hover:bg-[#1E40AF] btn-interactive"
                              >
                                Confirm Reschedule
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setRescheduleBookingId(null)}
                                className="btn-interactive"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog open={cancelBookingId === booking.id} onOpenChange={(open) => !open && setCancelBookingId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="btn-interactive text-xs"
                            onClick={() => setCancelBookingId(booking.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this booking for "{booking.service}"? 
                              This action cannot be undone and you may be charged a cancellation fee.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="btn-interactive">Keep Booking</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleCancelBooking(booking.id)}
                              className="bg-red-600 hover:bg-red-700 btn-interactive"
                            >
                              Yes, Cancel Booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {upcomingBookingsFromDb.length === 0 && fallbackUpcomingBookings.length === 0 && (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No upcoming bookings
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You don't have any upcoming service appointments
                  </p>
                  <Button 
                    onClick={() => navigateTo('booking')}
                    className="bg-[#22C55E] hover:bg-[#16A249] btn-interactive"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book a Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Job History */}
          <TabsContent value="history" className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Service</th>
                          <th className="text-left py-3 px-2">Provider</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Cost</th>
                          <th className="text-left py-3 px-2">Rating</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(bookingHistoryFromDb.length > 0 ? bookingHistoryFromDb : bookingHistory).map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-2 font-medium">{booking.service}</td>
                            <td className="py-4 px-2">{booking.provider}</td>
                            <td className="py-4 px-2">{new Date(booking.date).toLocaleDateString()}</td>
                            <td className="py-4 px-2 font-medium text-[#1E3A8A]">৳{booking.price}</td>
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(booking.rating || 0)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-sm text-gray-600 ml-1">
                                  ({booking.rating || 0}/5)
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-2">{getStatusBadge(booking.status)}</td>
                            <td className="py-4 px-2">
                              <div className="flex space-x-2">
                                {!booking.rating && booking.status === 'completed' && (
                                  <Dialog open={ratingBookingId === booking.id} onOpenChange={(open) => !open && setRatingBookingId(null)}>
                                    <DialogTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="btn-interactive"
                                        onClick={() => setRatingBookingId(booking.id)}
                                      >
                                        <Star className="h-3 w-3 mr-1" />
                                        Rate
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <DialogHeader>
                                        <DialogTitle>Rate Provider</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div>
                                          <Label>How was the service for "{booking.service}"?</Label>
                                          <div className="mt-2">
                                            <RatingComponent value={rating} onChange={setRating} />
                                          </div>
                                        </div>
                                        <div>
                                          <Label htmlFor="review">Review (Optional)</Label>
                                          <Textarea 
                                            id="review" 
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            placeholder="Share your experience..."
                                            className="mt-1"
                                          />
                                        </div>
                                        <div className="flex space-x-2">
                                          <Button 
                                            onClick={() => handleRateProvider(booking.id)}
                                            disabled={rating === 0}
                                            className="flex-1 bg-[#1E3A8A] hover:bg-[#1E40AF] btn-interactive"
                                          >
                                            Submit Rating
                                          </Button>
                                          <Button 
                                            variant="outline" 
                                            onClick={() => setRatingBookingId(null)}
                                            className="btn-interactive"
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                                <Button size="sm" variant="outline" className="btn-interactive">
                                  <Download className="h-3 w-3 mr-1" />
                                  Receipt
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {(bookingHistoryFromDb.length > 0 ? bookingHistoryFromDb : bookingHistory).map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{booking.service}</h3>
                        <p className="text-sm text-gray-600 truncate">Provider: {booking.provider}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cost:</span>
                        <span className="font-medium text-[#1E3A8A]">৳{booking.price}</span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(booking.rating || 0)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            ({booking.rating || 0}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    {booking.review && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">"{booking.review}"</p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {!booking.rating && booking.status === 'completed' && (
                        <Dialog open={ratingBookingId === booking.id} onOpenChange={(open) => !open && setRatingBookingId(null)}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 btn-interactive text-xs"
                              onClick={() => setRatingBookingId(booking.id)}
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Rate Provider
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rate Provider</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label>How was the service for "{booking.service}"?</Label>
                                <div className="mt-2">
                                  <RatingComponent value={rating} onChange={setRating} />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="review">Review (Optional)</Label>
                                <Textarea 
                                  id="review" 
                                  value={review}
                                  onChange={(e) => setReview(e.target.value)}
                                  placeholder="Share your experience..."
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  onClick={() => handleRateProvider(booking.id)}
                                  disabled={rating === 0}
                                  className="flex-1 bg-[#1E3A8A] hover:bg-[#1E40AF] btn-interactive"
                                >
                                  Submit Rating
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setRatingBookingId(null)}
                                  className="btn-interactive"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 btn-interactive text-xs"
                        onClick={() => navigateTo('booking')}
                      >
                        Book Again
                      </Button>
                      <Button size="sm" variant="outline" className="btn-interactive text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {bookingHistoryFromDb.length === 0 && bookingHistory.length === 0 && (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No booking history
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your completed bookings will appear here
                  </p>
                  <Button 
                    onClick={() => navigateTo('booking')}
                    className="bg-[#22C55E] hover:bg-[#16A249] btn-interactive"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Your First Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Receipts */}
          <TabsContent value="receipts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {receipts.map((receipt) => (
                <Card key={receipt.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">
                          Receipt #{receipt.id}
                        </h3>
                        <p className="text-gray-600 mb-2 truncate">
                          {receipt.service}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                          <span>
                            {new Date(receipt.date).toLocaleDateString()}
                          </span>
                          <span className="font-medium text-[#1E3A8A]">৳{receipt.amount}</span>
                          <span>{receipt.paymentMethod}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="btn-interactive w-full sm:w-auto"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {receipts.length === 0 && (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No receipts available
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your payment receipts will appear here after completed bookings
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-20 h-20 mx-auto sm:mx-0 bg-gradient-to-br from-[#1E3A8A] to-[#22C55E] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold">{user?.name || 'User'}</h3>
                    <p className="text-gray-600">Customer since {user ? new Date().toLocaleDateString() : 'August 2024'}</p>
                  </div>
                </div>

                <Separator />

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Email
                    </label>
                    <p className="text-gray-900 break-words">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Phone
                    </label>
                    <p className="text-gray-900">{user?.phone || '+880 1xxx-xxxxxx'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Default Area
                    </label>
                    <p className="text-gray-900">{user?.address || 'Dhanmondi, Dhaka'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Member Status
                    </label>
                    <Badge className="bg-amber-100 text-amber-800">Gold Member</Badge>
                  </div>
                </div>

                <Separator />

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                    <div className="text-2xl font-bold text-[#1E3A8A]">
                      {analytics?.totalBookings || bookings.length || 12}
                    </div>
                    <div className="text-sm text-blue-700">Total Bookings</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors">
                    <div className="text-2xl font-bold text-[#22C55E]">
                      ৳{analytics?.totalSpent || '4,800'}
                    </div>
                    <div className="text-sm text-green-700">Total Spent</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors">
                    <div className="text-2xl font-bold text-[#F97316]">
                      {analytics?.averageRating || '4.8'}
                    </div>
                    <div className="text-sm text-orange-700">Avg Rating Given</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button className="bg-[#1E3A8A] hover:bg-[#1E40AF] btn-interactive flex-1">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="btn-interactive flex-1">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}