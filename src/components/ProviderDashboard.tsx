import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Star,
  DollarSign,
  Calendar,
  User,
  ShieldCheck,
  Award,
  TrendingUp,
  AlertCircle,
  Navigation,
  PhoneCall,
  X,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { MockDatabase, User as UserType } from '../data/database';

interface ProviderDashboardProps {
  navigateTo: (page: string) => void;
  user: UserType | null;
}

export function ProviderDashboard({ navigateTo, user }: ProviderDashboardProps) {
  // State for modals and interactions
  const [phoneCallModal, setPhoneCallModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [jobProgressModal, setJobProgressModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobStatuses, setJobStatuses] = useState<{[key: string]: string}>({});
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Get provider data from database
  const provider = user ? MockDatabase.findProviderByUserId(user.id) : null;
  const analytics = user && provider ? MockDatabase.getProviderAnalytics(provider.id) : null;
  const bookings = provider ? MockDatabase.getBookingsByProviderId(provider.id) : [];
  const reviews = provider ? MockDatabase.getReviewsByProviderId(provider.id) : [];

  // Transform bookings to match component structure
  const assignedJobs = bookings.map(booking => {
    const customer = MockDatabase.findUserById(booking.customerId);
    const service = MockDatabase.findServiceById(booking.serviceId);
    return {
      id: booking.id,
      service: service?.name || 'Unknown Service',
      customer: customer?.name || 'Unknown Customer',
      address: booking.address,
      date: booking.scheduledDate,
      time: booking.scheduledTime,
      status: booking.status,
      price: booking.estimatedCost,
      phone: customer?.phone || '+880 1xxx-xxx000',
      description: booking.description
    };
  });

  // Fallback data if no database data
  const fallbackJobs = [
    {
      id: "JB001",
      service: "Plumbing Repair",
      customer: "Sarah Ahmed",
      address: "House 12, Road 5, Dhanmondi",
      date: "2024-08-22",
      time: "2:00 PM - 4:00 PM",
      status: "upcoming",
      price: 500,
      phone: "+880 1xxx-xxx001",
      description: "Kitchen sink leakage and bathroom pipe repair"
    },
    {
      id: "JB002",
      service: "Emergency Plumbing",
      customer: "Karim Rahman", 
      address: "Apartment 3B, Gulshan 1",
      date: "2024-08-22",
      time: "6:00 PM - 8:00 PM",
      status: "pending",
      price: 800,
      phone: "+880 1xxx-xxx002",
      description: "Water heater installation and testing"
    }
  ];

  const partsRequests = [
    {
      id: "PR001",
      jobId: "JB001",
      customer: "Sarah Ahmed",
      parts: [
        { name: "PVC Pipe (2m)", price: 150 },
        { name: "Pipe Joints (4pcs)", price: 80 }
      ],
      total: 230,
      status: "pending"
    },
    {
      id: "PR002", 
      jobId: "JB002",
      customer: "Karim Rahman",
      parts: [
        { name: "Water Heater Element", price: 350 },
        { name: "Thermostat", price: 120 }
      ],
      total: 470,
      status: "approved"
    }
  ];

  const ratingsReviews = [
    {
      id: "RV001",
      customer: "Fatima Khan",
      service: "Plumbing Service",
      rating: 5,
      review: "Excellent work! Ahmed was professional and fixed the problem quickly.",
      date: "2024-08-20"
    },
    {
      id: "RV002",
      customer: "Abdul Rahman", 
      service: "Pipe Installation",
      rating: 4,
      review: "Good service, arrived on time and work was done properly.",
      date: "2024-08-18"
    },
    {
      id: "RV003",
      customer: "Nasir Ahmed",
      service: "Drain Cleaning", 
      rating: 5,
      review: "Very satisfied with the service. Highly recommend!",
      date: "2024-08-15"
    }
  ];

  const getJobStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPartsStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Interactive functions
  const handleCallCustomer = (job: any) => {
    setSelectedJob(job);
    setPhoneCallModal(true);
  };

  const handleGetDirections = (job: any) => {
    setSelectedJob(job);
    setMapModal(true);
  };

  const handleStartJob = (job: any) => {
    setSelectedJob(job);
    setJobStatuses(prev => ({ ...prev, [job.id]: 'in-progress' }));
    // Navigate to job progress page instead of showing modal
    navigateTo('job-progress');
  };

  const handleAcceptJob = (job: any) => {
    setJobStatuses(prev => ({ ...prev, [job.id]: 'upcoming' }));
  };

  const handleDeclineJob = (job: any) => {
    setJobStatuses(prev => ({ ...prev, [job.id]: 'declined' }));
  };

  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    // Simulate call duration
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsCallActive(false);
    }, 30000); // Auto end call after 30 seconds for demo
  };

  const endCall = () => {
    setIsCallActive(false);
    setPhoneCallModal(false);
    setCallDuration(0);
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Provider Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your jobs and track your performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics?.completedJobs || 24}</p>
                  <p className="text-xs text-gray-500">Jobs Completed</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">৳{analytics?.totalEarnings?.toLocaleString() || '18,500'}</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics?.averageRating?.toFixed(1) || '4.9'}</p>
                  <p className="text-xs text-gray-500">{analytics?.totalReviews || 156} reviews</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-xs text-blue-600">+2% this month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">Assigned Jobs</TabsTrigger>
            <TabsTrigger value="parts">Parts Approval</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="profile">Profile & Verification</TabsTrigger>
          </TabsList>

          {/* Assigned Jobs */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="grid gap-6">
              {(assignedJobs.length > 0 ? assignedJobs : fallbackJobs).map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {job.service}
                        </h3>
                        <p className="text-gray-600">
                          Customer: {job.customer}
                        </p>
                      </div>
                      {getJobStatusBadge(jobStatuses[job.id] || job.status)}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{job.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(job.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{job.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">৳{job.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {job.address}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button 
                        size="sm"
                        onClick={() => handleCallCustomer(job)}
                        className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleGetDirections(job)}
                        className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md hover:bg-gray-50"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                      {(jobStatuses[job.id] || job.status) === 'upcoming' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartJob(job)}
                          className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Job
                        </Button>
                      )}
                      {(jobStatuses[job.id] || job.status) === 'in-progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => navigateTo('job-progress')}
                          className="bg-orange-600 hover:bg-orange-700 transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          View Progress
                        </Button>
                      )}
                      {(jobStatuses[job.id] || job.status) === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleAcceptJob(job)}
                            className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeclineJob(job)}
                            className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Parts Approval */}
          <TabsContent value="parts" className="space-y-6">
            <div className="grid gap-6">
              {partsRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Parts Request #{request.id}
                        </h3>
                        <p className="text-gray-600">
                          Customer: {request.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          Job: {request.jobId}
                        </p>
                      </div>
                      {getPartsStatusBadge(request.status)}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-3">Requested Parts:</h4>
                      <div className="space-y-2">
                        {request.parts.map((part, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm">{part.name}</span>
                            <span className="text-sm font-medium">৳{part.price}</span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>৳{request.total}</span>
                        </div>
                      </div>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                        >
                          Send to Customer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md hover:bg-gray-50"
                        >
                          Edit Request
                        </Button>
                      </div>
                    )}
                    {request.status === 'approved' && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Approved by customer</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid gap-6">
              {(reviews.length > 0 ? reviews.map(review => {
                const customer = MockDatabase.findUserById(review.customerId);
                return {
                  id: review.id,
                  customer: customer?.name || 'Unknown Customer',
                  service: 'Service',
                  rating: review.rating,
                  review: review.comment,
                  date: review.createdAt.split('T')[0]
                };
              }) : ratingsReviews).map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold mb-1">{review.customer}</h3>
                        <p className="text-gray-600 text-sm">{review.service}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-2 font-medium">{review.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800">"{review.review}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile & Verification */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'AH'}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user?.name || 'Ahmed Hassan'}</h3>
                    <p className="text-gray-600">{provider?.businessName || 'Professional Service Provider'}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-green-600">
                        {provider?.verified ? 'Verified Provider' : 'Pending Verification'}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Experience
                    </label>
                    <p className="text-gray-900">{provider?.experience ? `${provider.experience} years` : '8 years'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Specialization
                    </label>
                    <p className="text-gray-900">{provider?.specialties?.join(', ') || 'Professional Services'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Service Areas
                    </label>
                    <p className="text-gray-900">{provider?.serviceArea?.join(', ') || 'Dhaka City'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Price Range
                    </label>
                    <p className="text-gray-900">{provider?.priceRange || '৳300/hour'}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Verification Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Identity Verification</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Phone Number</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Professional License</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <span>Background Check</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{provider?.totalJobs || 456}</div>
                    <div className="text-sm text-blue-700">Completed Jobs</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{provider?.rating?.toFixed(1) || '4.9'}</div>
                    <div className="text-sm text-green-700">Average Rating</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-purple-700">Success Rate</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md">
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline"
                    className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md hover:bg-gray-50"
                  >
                    Update Availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Phone Call Modal */}
      <Dialog open={phoneCallModal} onOpenChange={setPhoneCallModal}>
        <DialogContent className="sm:max-w-md" aria-describedby="phone-call-description">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <PhoneCall className="h-5 w-5" />
              <span>Call Customer</span>
            </DialogTitle>
          </DialogHeader>
          <div id="phone-call-description" className="sr-only">
            Simulate a phone call to the customer for the selected job
          </div>
          <div className="space-y-6">
            {selectedJob && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto">
                  {selectedJob.customer.split(' ').map((n: any) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedJob.customer}</h3>
                  <p className="text-gray-600">{selectedJob.phone}</p>
                  <p className="text-sm text-gray-500">{selectedJob.service}</p>
                </div>
                
                {isCallActive && (
                  <div className="space-y-3">
                    <div className="animate-pulse">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <Volume2 className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-mono">{formatCallDuration(callDuration)}</p>
                    <p className="text-green-600 font-medium">Call in progress...</p>
                  </div>
                )}
                
                <div className="flex justify-center space-x-4">
                  {!isCallActive ? (
                    <Button 
                      onClick={startCall}
                      className="bg-green-600 hover:bg-green-700 px-8 py-6 rounded-full transition-all duration-200 hover:scale-105"
                    >
                      <PhoneCall className="h-6 w-6 mr-2" />
                      Start Call
                    </Button>
                  ) : (
                    <Button 
                      onClick={endCall}
                      variant="destructive"
                      className="px-8 py-6 rounded-full transition-all duration-200 hover:scale-105"
                    >
                      <X className="h-6 w-6 mr-2" />
                      End Call
                    </Button>
                  )}
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 text-left">
                  <h4 className="font-medium mb-2">Quick Notes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Confirm appointment time</li>
                    <li>• Verify address and access</li>
                    <li>• Discuss specific requirements</li>
                    <li>• Estimate completion time</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Map/Directions Modal */}
      <Dialog open={mapModal} onOpenChange={setMapModal}>
        <DialogContent className="sm:max-w-2xl" aria-describedby="map-directions-description">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Directions to Customer</span>
            </DialogTitle>
          </DialogHeader>
          <div id="map-directions-description" className="sr-only">
            View directions and route information to the customer's location
          </div>
          <div className="space-y-4">
            {selectedJob && (
              <>
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{selectedJob.customer}</h3>
                  <p className="text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {selectedJob.address}
                  </p>
                </div>
                
                {/* Mock Google Maps Embed */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
                  <div className="relative z-10 text-center space-y-3">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
                    <div>
                      <p className="font-semibold text-gray-800">Interactive Map</p>
                      <p className="text-sm text-gray-600">Route to customer location</p>
                      <p className="text-xs text-gray-500 mt-2">📍 Estimated time: 15 minutes</p>
                      <p className="text-xs text-gray-500">🚗 Distance: 3.2 km</p>
                    </div>
                  </div>
                  
                  {/* Mock route line */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-blue-500 transform rotate-45"></div>
                  <div className="absolute top-1/2 right-1/4 w-1/3 h-0.5 bg-blue-500 transform -rotate-12"></div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      // In a real app, this would open Google Maps
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedJob.address)}`, '_blank');
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Open in Maps
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setMapModal(false)}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Progress Modal */}
      <Dialog open={jobProgressModal} onOpenChange={setJobProgressModal}>
        <DialogContent className="sm:max-w-lg" aria-describedby="job-progress-description">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Job Progress</span>
            </DialogTitle>
          </DialogHeader>
          <div id="job-progress-description" className="sr-only">
            Track and manage the progress of the current job
          </div>
          <div className="space-y-6">
            {selectedJob && (
              <>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{selectedJob.service}</h3>
                  <p className="text-gray-700 mb-1">Customer: {selectedJob.customer}</p>
                  <p className="text-sm text-gray-600">{selectedJob.address}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Job Started</p>
                      <p className="text-sm text-gray-500">Arrived at location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">In Progress</p>
                      <p className="text-sm text-gray-500">Working on the repair</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Complete Job</p>
                      <p className="text-sm text-gray-400">Mark as finished</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="font-medium mb-2">Job Notes:</h4>
                  <textarea 
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Add notes about the job progress..."
                    rows={3}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setJobStatuses(prev => ({ ...prev, [selectedJob.id]: 'completed' }));
                      setJobProgressModal(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Job
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setJobProgressModal(false)}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}