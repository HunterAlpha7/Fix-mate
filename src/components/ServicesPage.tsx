import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Droplets, 
  Wind, 
  Paintbrush, 
  Sparkles, 
  Zap, 
  Wrench, 
  Car, 
  Tv, 
  Smartphone, 
  Wifi, 
  Home, 
  Hammer,
  Scissors,
  Camera,
  Settings
} from 'lucide-react';

interface ServicesPageProps {
  navigateTo: (page: string) => void;
}

export function ServicesPage({ navigateTo }: ServicesPageProps) {
  const services = [
    {
      icon: <Droplets className="h-10 w-10 text-blue-500" />,
      title: "Plumbing",
      description: "Expert plumbing services including pipe repairs, leak fixing, drain cleaning, and water heater installation.",
      price: "From ৳300",
      service: "plumbing"
    },
    {
      icon: <Wind className="h-10 w-10 text-green-500" />,
      title: "AC Repair & Service",
      description: "Professional AC installation, repair, maintenance, and gas refilling services.",
      price: "From ৳500",
      service: "ac-repair"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-purple-500" />,
      title: "Home Cleaning",
      description: "Deep cleaning, regular housekeeping, carpet cleaning, and post-construction cleanup.",
      price: "From ৳800",
      service: "cleaning"
    },
    {
      icon: <Paintbrush className="h-10 w-10 text-orange-500" />,
      title: "Painting",
      description: "Interior and exterior painting, wall preparation, and color consultation services.",
      price: "From ৳15/sqft",
      service: "painting"
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: "Electrical Work",
      description: "Electrical repairs, wiring, switch/outlet installation, and safety inspections.",
      price: "From ৳200",
      service: "electrical"
    },
    {
      icon: <Wrench className="h-10 w-10 text-gray-600" />,
      title: "Appliance Repair",
      description: "Repair services for washing machines, refrigerators, ovens, and other home appliances.",
      price: "From ৳400",
      service: "appliance-repair"
    },
    {
      icon: <Car className="h-10 w-10 text-red-500" />,
      title: "Car Service",
      description: "Basic car maintenance, oil changes, tire services, and minor repairs.",
      price: "From ৳1000",
      service: "car-service"
    },
    {
      icon: <Tv className="h-10 w-10 text-indigo-500" />,
      title: "TV & Electronics",
      description: "TV mounting, sound system setup, and electronic device repairs.",
      price: "From ৳300",
      service: "electronics"
    },
    {
      icon: <Smartphone className="h-10 w-10 text-pink-500" />,
      title: "Phone Repair",
      description: "Screen replacement, battery replacement, and other smartphone repair services.",
      price: "From ৳500",
      service: "phone-repair"
    },
    {
      icon: <Wifi className="h-10 w-10 text-cyan-500" />,
      title: "Internet & Tech",
      description: "WiFi setup, router configuration, computer repairs, and tech support.",
      price: "From ৳250",
      service: "tech-support"
    },
    {
      icon: <Home className="h-10 w-10 text-brown-500" />,
      title: "Home Improvement",
      description: "Minor renovations, furniture assembly, shelving installation, and home repairs.",
      price: "From ৳500",
      service: "home-improvement"
    },
    {
      icon: <Hammer className="h-10 w-10 text-slate-600" />,
      title: "Carpentry",
      description: "Custom furniture, door/window repairs, and wooden fixture installations.",
      price: "From ৳800",
      service: "carpentry"
    },
    {
      icon: <Scissors className="h-10 w-10 text-teal-500" />,
      title: "Beauty Services",
      description: "Home salon services including haircuts, styling, and beauty treatments.",
      price: "From ৳600",
      service: "beauty"
    },
    {
      icon: <Camera className="h-10 w-10 text-violet-500" />,
      title: "Photography",
      description: "Event photography, portrait sessions, and professional photo services.",
      price: "From ৳2000",
      service: "photography"
    },
    {
      icon: <Settings className="h-10 w-10 text-gray-500" />,
      title: "General Maintenance",
      description: "Regular home maintenance, inspections, and preventive care services.",
      price: "From ৳400",
      service: "maintenance"
    }
  ];

  const handleBookService = (service: string) => {
    navigateTo('booking');
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional home services delivered by verified local experts. Choose from our wide range of services and get instant quotes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-50 rounded-xl p-3 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        {service.price}
                      </span>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                        onClick={() => handleBookService(service.service)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-blue-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Don't See What You Need?
            </h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              We offer many more services! Contact us directly and we'll connect you with the right professional.
            </p>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              onClick={() => navigateTo('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}