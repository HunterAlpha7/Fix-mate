import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Eye, EyeOff, Wrench, Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  navigateTo: (page: string) => void;
  onLogin: (email: string, password: string, userType: 'customer' | 'provider') => void;
}

export function LoginPage({ navigateTo, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
    userType: 'customer' as 'customer' | 'provider'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      userType: value as 'customer' | 'provider'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    // Call the login function passed from App
    const success = onLogin(formData.email, formData.password);
    if (!success) {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <div 
              className="flex items-center justify-center space-x-2 mb-4 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <div className="bg-blue-900 p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-900">FixMaster</span>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your account</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={handleUserTypeChange}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Customer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="provider" id="provider" />
                    <Label htmlFor="provider">Service Provider</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email or phone"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    name="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remember: checked as boolean }))}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <button 
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => alert('Password reset functionality would be implemented here')}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In as {formData.userType === 'customer' ? 'Customer' : 'Service Provider'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Google login would be implemented here')}
              >
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Facebook login would be implemented here')}
              >
                Facebook
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button 
                onClick={() => navigateTo('signup')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}