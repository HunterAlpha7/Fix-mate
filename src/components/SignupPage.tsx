import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, Wrench, User, Mail, Lock, Phone } from 'lucide-react';

interface SignupPageProps {
  navigateTo: (page: string) => void;
  onSignup: (userData: any, userType: 'customer' | 'provider') => void;
}

export function SignupPage({ navigateTo, onSignup }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer' as 'customer' | 'provider',
    serviceCategory: '',
    experience: '',
    area: '',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    if (formData.userType === 'provider' && (!formData.serviceCategory || !formData.experience)) {
      alert('Please fill in service category and experience for provider registration');
      return;
    }

    // Call the signup function passed from App
    const success = onSignup(formData);
    if (!success) {
      alert('Email already exists. Please use a different email or login instead.');
    }
  };

  const serviceCategories = [
    'Plumbing', 'AC Repair', 'Electrical', 'Cleaning', 'Painting', 
    'Carpentry', 'Appliance Repair', 'Home Security', 'Landscaping'
  ];

  const experienceLevels = [
    '1-2 years', '3-5 years', '6-10 years', '10+ years'
  ];

  const areas = [
    'Gulshan', 'Dhanmondi', 'Uttara', 'Banani', 'Mirpur', 'Mohammadpur',
    'Wari', 'Old Dhaka', 'Tejgaon', 'Ramna', 'Motijheel'
  ];

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
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <p className="text-gray-600">Join the FixMaster community</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label>I want to:</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={handleUserTypeChange}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Book Services</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="provider" id="provider" />
                    <Label htmlFor="provider">Provide Services</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Area Selection */}
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Select onValueChange={handleSelectChange('area')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area.toLowerCase()}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Provider-specific fields */}
              {formData.userType === 'provider' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory">Service Category</Label>
                    <Select onValueChange={handleSelectChange('serviceCategory')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service category" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Select onValueChange={handleSelectChange('experience')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I agree to the{' '}
                  <button 
                    type="button"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => alert('Terms and conditions would be shown here')}
                  >
                    Terms and Conditions
                  </button>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                Create Account as {formData.userType === 'customer' ? 'Customer' : 'Service Provider'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Google signup would be implemented here')}
              >
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Facebook signup would be implemented here')}
              >
                Facebook
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <button 
                onClick={() => navigateTo('login')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}