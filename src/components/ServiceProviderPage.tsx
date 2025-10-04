import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Star, MapPin, Phone, ShieldCheck, Clock, Filter } from 'lucide-react';
import { MockDatabase } from '../data/database';

interface ServiceProviderPageProps {
  navigateTo: (page: string) => void;
}

export function ServiceProviderPage({ navigateTo }: ServiceProviderPageProps) {
  const [ratingFilter, setRatingFilter] = useState<string | undefined>(undefined);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | undefined>(undefined);
  const [distanceFilter, setDistanceFilter] = useState<string | undefined>(undefined);

  // Get providers from database
  const dbProviders = MockDatabase.getProviders();
  
  // Transform database providers to match component structure
  const providers = dbProviders.map(provider => {
    const user = MockDatabase.findUserById(provider.userId);
    return {
      id: provider.id,
      name: user?.name || 'Unknown',
      profession: provider.specialties[0] || 'Service Provider',
      rating: provider.rating,
      reviewCount: provider.totalReviews,
      experience: `${provider.experience} years`,
      distance: `${Math.floor(Math.random() * 5) + 0.5} km`, // Mock distance
      availability: provider.availability.includes('Monday') ? 'Available today' : 'Available tomorrow',
      verified: provider.verified,
      phone: user?.phone || '+880 1xxx-xxx000',
      completedJobs: provider.totalJobs,
      specialties: provider.specialties,
      hourlyRate: Math.floor(Math.random() * 300) + 200, // Mock hourly rate
      businessName: provider.businessName,
      responseTime: provider.responseTime,
      location: provider.location
    };
  });

  // Keep original mock data as fallback
  const fallbackProviders = [
    {
      id: 1,
      name: "Ahmed Hassan",
      profession: "Plumber",
      rating: 4.9,
      reviewCount: 127,
      experience: "8 years",
      distance: "1.2 km",
      availability: "Available today",
      verified: true,
      phone: "+880 1xxx-xxx001",
      completedJobs: 456,
      specialties: ["Pipe Repair", "Water Heater", "Drain Cleaning"],
      hourlyRate: 300
    },
    {
      id: 2,
      name: "Fatima Rahman",
      profession: "AC Technician", 
      rating: 4.8,
      reviewCount: 89,
      experience: "6 years",
      distance: "0.8 km",
      availability: "Available now",
      verified: true,
      phone: "+880 1xxx-xxx002",
      completedJobs: 312,
      specialties: ["AC Installation", "Gas Refilling", "Maintenance"],
      hourlyRate: 450
    },
    {
      id: 3,
      name: "Karim Ahmed",
      profession: "Electrician",
      rating: 4.7,
      reviewCount: 203,
      experience: "12 years",
      distance: "2.1 km", 
      availability: "Available tomorrow",
      verified: true,
      phone: "+880 1xxx-xxx003",
      completedJobs: 678,
      specialties: ["Wiring", "Switch Installation", "Safety Check"],
      hourlyRate: 350
    },
    {
      id: 4,
      name: "Nasir Uddin",
      profession: "Painter",
      rating: 4.6,
      reviewCount: 156,
      experience: "10 years", 
      distance: "1.7 km",
      availability: "Available today",
      verified: true,
      phone: "+880 1xxx-xxx004",
      completedJobs: 234,
      specialties: ["Interior Painting", "Exterior Painting", "Color Consultation"],
      hourlyRate: 250
    },
    {
      id: 5,
      name: "Sara Khan",
      profession: "Cleaner",
      rating: 4.9,
      reviewCount: 98,
      experience: "5 years",
      distance: "0.5 km",
      availability: "Available now", 
      verified: true,
      phone: "+880 1xxx-xxx005",
      completedJobs: 189,
      specialties: ["Deep Cleaning", "Regular Cleaning", "Post-construction"],
      hourlyRate: 200
    },
    {
      id: 6,
      name: "Mizanur Rahman",
      profession: "Carpenter",
      rating: 4.8,
      reviewCount: 134,
      experience: "15 years",
      distance: "3.2 km",
      availability: "Available tomorrow",
      verified: true,
      phone: "+880 1xxx-xxx006", 
      completedJobs: 423,
      specialties: ["Furniture Repair", "Door Installation", "Custom Work"],
      hourlyRate: 400
    }
  ];

  const filteredProviders = providers.filter(provider => {
    if (ratingFilter && provider.rating < parseFloat(ratingFilter)) return false;
    if (availabilityFilter === 'now' && !provider.availability.includes('now')) return false;
    if (availabilityFilter === 'today' && !provider.availability.includes('today') && !provider.availability.includes('now')) return false;
    if (distanceFilter === 'nearby' && parseFloat(provider.distance) > 1.5) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Service Providers
          </h1>
          <p className="text-gray-600">
            Choose from our verified professionals in your area
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Filters</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Minimum Rating
                </label>
                <Select value={ratingFilter} onValueChange={(value) => setRatingFilter(value === 'all' ? undefined : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any rating</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.7">4.7+ stars</SelectItem>
                    <SelectItem value="4.8">4.8+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Availability
                </label>
                <Select value={availabilityFilter} onValueChange={(value) => setAvailabilityFilter(value === 'all' ? undefined : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="now">Available now</SelectItem>
                    <SelectItem value="today">Available today</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Distance
                </label>
                <Select value={distanceFilter} onValueChange={(value) => setDistanceFilter(value === 'all' ? undefined : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any distance</SelectItem>
                    <SelectItem value="nearby">Within 1.5 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setRatingFilter(undefined);
                    setAvailabilityFilter(undefined);
                    setDistanceFilter(undefined);
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Provider Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      {provider.verified && (
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600">{provider.profession}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Provider Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{provider.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completed Jobs:</span>
                    <span className="font-medium">{provider.completedJobs}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      Distance:
                    </span>
                    <span className="font-medium">{provider.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Availability:
                    </span>
                    <Badge variant={provider.availability.includes('now') ? 'default' : 'secondary'}>
                      {provider.availability}
                    </Badge>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Starting from:</span>
                    <span className="font-semibold text-green-800">
                      ৳{provider.hourlyRate}/hour
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => navigateTo('booking')}
                  >
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {provider.phone}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              No providers found matching your criteria
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setRatingFilter(undefined);
                setAvailabilityFilter(undefined);
                setDistanceFilter(undefined);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}