import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Wrench, User, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface NavigationProps {
  navigateTo: (page: string) => void;
  isAuthenticated: boolean;
  userType: 'customer' | 'provider' | null;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function Navigation({ navigateTo, isAuthenticated, userType, user, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
    { key: 'providers', label: 'Find Providers' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: string) => {
    navigateTo(page);
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    if (userType === 'provider') {
      navigateTo('provider-dashboard');
    } else {
      navigateTo('customer-dashboard');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-blue-900 p-2 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-900">FixMaster</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.email}
                  </div>
                  <div className="px-2 py-1.5 text-xs text-gray-500 capitalize">
                    {userType} Account
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboardClick}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                  onClick={() => handleNavClick('login')}
                >
                  Login
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleNavClick('signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.key}
                      onClick={() => handleNavClick(link.key)}
                      className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                  
                  <div className="border-t pt-4 space-y-2">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 text-sm font-medium text-gray-900">
                          {user?.name}
                        </div>
                        <div className="px-3 py-1 text-xs text-gray-500 capitalize">
                          {userType} Account
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleDashboardClick}
                        >
                          Dashboard
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={onLogout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                          onClick={() => handleNavClick('login')}
                        >
                          Login
                        </Button>
                        <Button 
                          className="w-full bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleNavClick('signup')}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}