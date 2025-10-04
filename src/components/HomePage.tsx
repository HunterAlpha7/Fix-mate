import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Search, Wrench, Droplets, Wind, Paintbrush, Sparkles, Clock, Shield, Star, CheckCircle, Users, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  navigateTo: (page: string) => void;
}

export function HomePage({ navigateTo }: HomePageProps) {
  const featuredServices = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      title: "Plumbing",
      description: "Expert plumbers for all your water and pipe issues",
      service: "plumbing"
    },
    {
      icon: <Wind className="h-8 w-8 text-green-500" />,
      title: "AC Repair",
      description: "Professional AC installation and repair services",
      service: "ac-repair"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: "Cleaning",
      description: "Professional home and office cleaning services",
      service: "cleaning"
    },
    {
      icon: <Paintbrush className="h-8 w-8 text-orange-500" />,
      title: "Painting",
      description: "Interior and exterior painting by skilled professionals",
      service: "painting"
    }
  ];

  const howItWorks = [
    {
      icon: <Search className="h-12 w-12 text-blue-500" />,
      title: "Search Service",
      description: "Find the service you need in your area"
    },
    {
      icon: <Users className="h-12 w-12 text-green-500" />,
      title: "Choose Provider",
      description: "Select from verified local service providers"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500" />,
      title: "Get it Done",
      description: "Enjoy quality service at your doorstep"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      location: "Gulshan, Dhaka",
      rating: 5,
      comment: "Amazing service! The plumber arrived on time and fixed my issue quickly. Highly recommended!"
    },
    {
      name: "Karim Rahman",
      location: "Dhanmondi, Dhaka", 
      rating: 5,
      comment: "Professional AC repair service. The technician was knowledgeable and the price was fair."
    },
    {
      name: "Fatima Khan",
      location: "Uttara, Dhaka",
      rating: 5,
      comment: "Excellent cleaning service! They made my home spotless. Will definitely book again."
    }
  ];

  const handleSearchServices = () => {
    navigateTo('services');
  };

  const handleBookService = (service?: string) => {
    navigateTo('booking');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Neighborhood Repair Service
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Fast, trusted, from your own area
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="ac-repair">AC Repair</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="painting">Painting</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gulshan">Gulshan</SelectItem>
                    <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                    <SelectItem value="uttara">Uttara</SelectItem>
                    <SelectItem value="banani">Banani</SelectItem>
                    <SelectItem value="mirpur">Mirpur</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full"
                  onClick={handleSearchServices}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Services
                </Button>
              </div>
            </div>
            
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-xl"
              onClick={() => handleBookService()}
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional services delivered by trusted local experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleBookService(service.service)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="px-8 py-3 text-lg"
              onClick={() => navigateTo('services')}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How FixMaster Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your problems fixed in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from satisfied customers across Dhaka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Verified Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers who trust FixMaster for their home repair needs
          </p>
          <Button 
            className="bg-white text-green-500 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl"
            onClick={() => handleBookService()}
          >
            Book Your Service Now
          </Button>
        </div>
      </section>
    </div>
  );
}