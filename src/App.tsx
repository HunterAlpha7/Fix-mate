import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceBookingPage } from './components/ServiceBookingPage';
import { ServiceProviderPage } from './components/ServiceProviderPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ProviderDashboard } from './components/ProviderDashboard';
import { JobProgressPage } from './components/JobProgressPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { PaymentPage } from './components/PaymentPage';
import { MockDatabase, User } from './data/database';

type PageType = 
  | 'home' 
  | 'services' 
  | 'booking' 
  | 'providers' 
  | 'customer-dashboard' 
  | 'provider-dashboard'
  | 'job-progress'
  | 'about' 
  | 'contact' 
  | 'login' 
  | 'signup' 
  | 'payment';

type UserType = 'customer' | 'provider' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [user, setUser] = useState<User | null>(null);

  // Navigation function that can be passed to components
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  // Authentication functions
  const handleLogin = (email: string, password: string) => {
    const foundUser = MockDatabase.findUserByEmail(email);
    
    if (foundUser && foundUser.password === password) {
      setIsAuthenticated(true);
      setUserType(foundUser.type);
      setUser(foundUser);
      
      // Redirect based on user type
      if (foundUser.type === 'provider') {
        navigateTo('provider-dashboard');
      } else {
        navigateTo('customer-dashboard');
      }
      return true;
    }
    return false;
  };

  const handleSignup = (userData: any) => {
    // Check if user already exists
    const existingUser = MockDatabase.findUserByEmail(userData.email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser = MockDatabase.createUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      type: userData.userType || 'customer',
      phone: userData.phone,
      address: userData.address
    });
    
    setIsAuthenticated(true);
    setUserType(newUser.type);
    setUser(newUser);
    
    // Redirect based on user type
    if (newUser.type === 'provider') {
      navigateTo('provider-dashboard');
    } else {
      navigateTo('customer-dashboard');
    }
    return true;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);
    navigateTo('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'services':
        return <ServicesPage navigateTo={navigateTo} />;
      case 'booking':
        return <ServiceBookingPage navigateTo={navigateTo} user={user} />;
      case 'providers':
        return <ServiceProviderPage navigateTo={navigateTo} />;
      case 'customer-dashboard':
        return <CustomerDashboard navigateTo={navigateTo} user={user} />;
      case 'provider-dashboard':
        return <ProviderDashboard navigateTo={navigateTo} user={user} />;
      case 'job-progress':
        return <JobProgressPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'signup':
        return <SignupPage navigateTo={navigateTo} onSignup={handleSignup} />;
      case 'payment':
        return <PaymentPage navigateTo={navigateTo} user={user} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        navigateTo={navigateTo} 
        isAuthenticated={isAuthenticated}
        userType={userType}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer navigateTo={navigateTo} />
      
      {/* Demo Navigation Panel - For demonstration purposes */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg border p-4 max-w-xs">
          <div className="text-sm font-medium mb-3 text-gray-700">
            Demo Navigation
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => navigateTo('home')}
              className={`p-2 rounded text-left ${currentPage === 'home' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('services')}
              className={`p-2 rounded text-left ${currentPage === 'services' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Services
            </button>
            <button
              onClick={() => navigateTo('booking')}
              className={`p-2 rounded text-left ${currentPage === 'booking' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Booking
            </button>
            <button
              onClick={() => navigateTo('providers')}
              className={`p-2 rounded text-left ${currentPage === 'providers' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Providers
            </button>
            <button
              onClick={() => navigateTo('customer-dashboard')}
              className={`p-2 rounded text-left ${currentPage === 'customer-dashboard' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Customer
            </button>
            <button
              onClick={() => navigateTo('provider-dashboard')}
              className={`p-2 rounded text-left ${currentPage === 'provider-dashboard' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Provider
            </button>
            <button
              onClick={() => navigateTo('job-progress')}
              className={`p-2 rounded text-left ${currentPage === 'job-progress' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Job Progress
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`p-2 rounded text-left ${currentPage === 'about' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`p-2 rounded text-left ${currentPage === 'contact' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Contact
            </button>
            <button
              onClick={() => navigateTo('login')}
              className={`p-2 rounded text-left ${currentPage === 'login' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Login
            </button>
            <button
              onClick={() => navigateTo('signup')}
              className={`p-2 rounded text-left ${currentPage === 'signup' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Signup
            </button>
            <button
              onClick={() => navigateTo('payment')}
              className={`p-2 rounded text-left ${currentPage === 'payment' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Payment
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 rounded text-left bg-red-100 text-red-800 hover:bg-red-200"
              >
                Logout
              </button>
            )}
          </div>
          {isAuthenticated && user && (
            <div className="mt-3 pt-3 border-t text-xs text-gray-600">
              Logged in as: {user.name} ({userType})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}