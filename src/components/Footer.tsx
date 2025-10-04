import { Wrench, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  navigateTo: (page: string) => void;
}

export function Footer({ navigateTo }: FooterProps) {
  const serviceLinks = [
    { label: 'Plumbing', action: () => navigateTo('services') },
    { label: 'AC Repair', action: () => navigateTo('services') },
    { label: 'Electrical', action: () => navigateTo('services') },
    { label: 'Cleaning', action: () => navigateTo('services') },
    { label: 'Painting', action: () => navigateTo('services') }
  ];

  const companyLinks = [
    { label: 'About Us', action: () => navigateTo('about') },
    { label: 'Contact', action: () => navigateTo('contact') },
    { label: 'Find Providers', action: () => navigateTo('providers') },
    { label: 'Become a Provider', action: () => navigateTo('signup') },
    { label: 'Help Center', action: () => alert('Help center would be implemented') }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FixMaster</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted neighborhood repair service platform. Connecting customers with verified local service providers across Dhaka.
            </p>
            <div className="flex space-x-4">
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => alert('Facebook page would open')}
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => alert('Twitter page would open')}
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => alert('Instagram page would open')}
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => alert('LinkedIn page would open')}
              >
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+880 1700-000000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">support@fixmaster.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FixMaster. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => alert('Privacy policy would be shown')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => alert('Terms of service would be shown')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => alert('Cookie policy would be shown')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}