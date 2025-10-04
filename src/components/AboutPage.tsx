import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Search, 
  Users, 
  CheckCircle, 
  Shield, 
  Clock, 
  Award,
  Target,
  Heart,
  Lightbulb
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  navigateTo: (page: string) => void;
}

export function AboutPage({ navigateTo }: AboutPageProps) {
  const howItWorks = [
    {
      icon: <Search className="h-12 w-12 text-blue-500" />,
      title: "Search & Request",
      description: "Customers browse services and submit requests for their specific needs in their local area."
    },
    {
      icon: <Users className="h-12 w-12 text-green-500" />,
      title: "Provider Match",
      description: "Our system connects customers with verified local service providers based on location and expertise."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500" />,
      title: "Service Delivery",
      description: "Providers complete the job with quality assurance, and customers provide feedback for continuous improvement."
    }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Trust & Safety",
      description: "All our service providers are thoroughly verified and background-checked for your peace of mind."
    },
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "Reliability",
      description: "We ensure timely service delivery with real-time tracking and communication throughout the process."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Quality Assurance", 
      description: "Every service is backed by our quality guarantee and comprehensive customer support."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Community Focus",
      description: "We prioritize local providers and contribute to strengthening neighborhood communities."
    }
  ];

  const team = [
    {
      name: "Anjum Khan Turna",
      role: "Chief Executive Officer",
      description: "Visionary leader with extensive experience in technology and business development, driving FixMaster's mission to transform local services.",
      image: "female executive leader"
    },
    {
      name: "Tanjina Ahmed",
      role: "Chief Operating Officer",
      description: "Operations expert focused on scaling service delivery and ensuring exceptional customer and provider experiences.",
      image: "business woman professional"
    },
    {
      name: "Mahmud Hassan",
      role: "Chief Technology Officer",
      description: "Software engineer passionate about building scalable technology solutions that connect communities.",
      image: "male programmer developer"
    },
    {
      name: "Tariq Rahman",
      role: "Head of Growth",
      description: "Marketing strategist dedicated to expanding FixMaster's reach and building strong community partnerships across Bangladesh.",
      image: "marketing professional man"
    }
  ];

  const handleBookService = () => {
    navigateTo('services');
  };

  const handleContactUs = () => {
    navigateTo('contact');
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About FixMaster
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing how people access trusted home services by connecting neighborhoods 
            with verified local professionals who understand their community's needs.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Empowering Communities Through Trusted Local Services
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  FixMaster was born from the simple belief that everyone deserves access to reliable, 
                  high-quality home services from people they can trust. We're building a platform that 
                  not only solves immediate problems but strengthens the fabric of local communities 
                  by creating meaningful connections between neighbors.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Verified Providers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">15+</div>
                    <div className="text-sm text-gray-600">Service Categories</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">4.9</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How FixMaster Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Lightbulb className="h-6 w-6 text-orange-500" />
              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent, Effective
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've designed our platform to make getting quality home services as easy as possible, 
              while ensuring every interaction builds trust and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-gray-50">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20 bg-gray-50 -mx-4 px-4 py-16 md:-mx-8 md:px-8 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at FixMaster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate leaders working to transform how Bangladesh accesses home services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FixMaster for their home service needs.
            Let us connect you with the perfect local professional today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3"
              onClick={handleBookService}
            >
              Book a Service
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={handleContactUs}
            >
              Contact Us
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-semibold">📞 Phone</div>
                <div className="text-blue-200">+880 1700-000000</div>
              </div>
              <div>
                <div className="font-semibold">✉️ Email</div>
                <div className="text-blue-200">hello@fixmaster.com</div>
              </div>
              <div>
                <div className="font-semibold">📍 Location</div>
                <div className="text-blue-200">Dhaka, Bangladesh</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}