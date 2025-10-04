import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { MockDatabase, User } from '../data/database';

interface ServiceBookingPageProps {
  navigateTo: (page: string) => void;
  user?: User | null;
}

export function ServiceBookingPage({ navigateTo, user }: ServiceBookingPageProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const serviceDetails = {
    title: "Plumbing Service",
    description: "Expert plumbing repair and maintenance",
    basePrice: 500,
    estimatedDuration: "1-2 hours"
  };

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM", 
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const areas = [
    "Gulshan", "Dhanmondi", "Uttara", "Banani", "Mirpur", 
    "Wari", "Motijheel", "Farmgate", "Tejgaon", "Ramna"
  ];

  const calculateTotal = () => {
    return serviceDetails.basePrice;
  };

  const handleConfirmBooking = () => {
    // Validate required fields
    if (!selectedDate || !selectedTime || !selectedArea || !paymentMethod || !customerName || !phoneNumber || !address) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Create booking in database
      const services = MockDatabase.getServices();
      const providers = MockDatabase.getProviders();
      const selectedService = services[0]; // For demo, use first service
      const selectedProvider = providers[0]; // For demo, use first provider
      
      // Use current user ID or fallback to mock ID
      const customerId = user?.id || 'user-1';
      
      const newBooking = MockDatabase.createBooking({
        customerId,
        providerId: selectedProvider.id,
        serviceId: selectedService.id,
        status: 'pending',
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        address: `${address}, ${selectedArea}`,
        description: `${serviceDetails.title} - ${serviceDetails.description}`,
        estimatedCost: calculateTotal()
      });

      console.log('Booking created:', newBooking);
      
      // Store booking data for payment page
      const bookingData = {
        bookingId: newBooking.id,
        service: serviceDetails,
        date: selectedDate,
        time: selectedTime,
        area: selectedArea,
        paymentMethod,
        customer: {
          name: customerName,
          phone: phoneNumber,
          address: address
        },
        total: calculateTotal()
      };

      console.log('Booking confirmed:', bookingData);

      // Navigate to payment page if payment method is digital (bKash or Nagad)
      if (paymentMethod === 'bkash' || paymentMethod === 'nagad') {
        navigateTo('payment');
      } else {
        // For cash payment, show confirmation and go to customer dashboard
        alert('Booking confirmed! You will pay cash on delivery. Redirecting to your dashboard...');
        navigateTo('customer-dashboard');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const isFormValid = selectedDate && selectedTime && selectedArea && paymentMethod && customerName && phoneNumber && address;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Service
          </h1>
          <p className="text-gray-600">
            Complete your booking in a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Confirmation */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-1">
                    {serviceDetails.title}
                  </h3>
                  <p className="text-blue-700 text-sm">
                    {serviceDetails.description}
                  </p>
                  <p className="text-blue-600 text-sm mt-2">
                    Estimated duration: {serviceDetails.estimatedDuration}
                  </p>
                </div>

                {/* Area Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Service Area *
                  </Label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area.toLowerCase()}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Preferred Date *
                  </Label>
                  <Input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Preferred Time *
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input 
                      placeholder="Enter your full name" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input 
                      placeholder="+880 1xxx-xxxxxx" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address Details *</Label>
                  <Input 
                    placeholder="House/Flat number, Road, Landmark" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Method *
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      <div className="text-center">
                        <div className="font-medium">Cash</div>
                        <div className="text-sm text-gray-500">Pay on delivery</div>
                      </div>
                    </div>
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        paymentMethod === 'bkash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('bkash')}
                    >
                      <div className="text-center">
                        <div className="font-medium text-pink-600">bKash</div>
                        <div className="text-sm text-gray-500">Mobile payment</div>
                      </div>
                    </div>
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        paymentMethod === 'nagad' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('nagad')}
                    >
                      <div className="text-center">
                        <div className="font-medium text-orange-600">Nagad</div>
                        <div className="text-sm text-gray-500">Mobile payment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service</span>
                    <span>{serviceDetails.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>৳{serviceDetails.basePrice}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>৳{calculateTotal()}</span>
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="bg-green-50 rounded-lg p-3 text-sm">
                    <div className="font-medium text-green-800 mb-1">
                      Scheduled for:
                    </div>
                    <div className="text-green-700">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-green-700">{selectedTime}</div>
                  </div>
                )}

                {selectedArea && (
                  <div className="bg-blue-50 rounded-lg p-3 text-sm">
                    <div className="font-medium text-blue-800 mb-1">
                      Service Area:
                    </div>
                    <div className="text-blue-700 capitalize">{selectedArea}</div>
                  </div>
                )}

                {paymentMethod && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="font-medium text-gray-800 mb-1">
                      Payment Method:
                    </div>
                    <div className="text-gray-700 capitalize">
                      {paymentMethod === 'bkash' ? 'bKash' : 
                       paymentMethod === 'nagad' ? 'Nagad' : 'Cash on Delivery'}
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={!isFormValid}
                  onClick={handleConfirmBooking}
                >
                  {paymentMethod === 'cash' ? 'Confirm Booking' : 'Proceed to Payment'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our terms of service and privacy policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}