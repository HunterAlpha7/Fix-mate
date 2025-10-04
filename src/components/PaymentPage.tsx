import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Download, 
  CheckCircle, 
  CreditCard, 
  Calendar, 
  User as UserIcon, 
  MapPin,
  Receipt,
  ArrowLeft,
  Phone
} from 'lucide-react';
import { MockDatabase, User } from '../data/database';

interface PaymentPageProps {
  navigateTo: (page: string) => void;
  user?: User | null;
}

export function PaymentPage({ navigateTo, user }: PaymentPageProps) {
  const [paymentStep, setPaymentStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [paymentMethod] = useState('bkash'); // This would come from booking data
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  const bookingDetails = {
    id: "BK001",
    service: "Plumbing Service",
    provider: "Ahmed Hassan",
    customer: "John Doe",
    date: "2024-08-22",
    time: "2:00 PM - 4:00 PM",
    address: "House 12, Road 5, Dhanmondi",
    basePrice: 500,
    tax: 50,
    total: 550,
    paymentMethod: "bKash",
    transactionId: "TXN123456789"
  };

  const handlePayment = () => {
    if (!phoneNumber || !pin) {
      alert('Please fill in all payment details');
      return;
    }

    setPaymentStep('processing');
    
    // Create payment record in database
    try {
      const newPayment = MockDatabase.createPayment({
        bookingId: bookingDetails.id,
        customerId: user?.id || 'user-1',
        providerId: 'provider-1', // Mock provider ID
        amount: bookingDetails.total,
        method: 'mobile-banking',
        status: 'processing',
        metadata: {
          bkashNumber: phoneNumber,
          reference: `Payment for ${bookingDetails.service}`
        }
      });

      // Simulate payment processing
      setTimeout(() => {
        // Update payment status to completed
        MockDatabase.updatePayment(newPayment.id, {
          status: 'completed',
          transactionId: `TXN${Date.now()}`,
          completedAt: new Date().toISOString()
        });

        // Update booking status
        MockDatabase.updateBooking(bookingDetails.id, {
          status: 'confirmed',
          paymentId: newPayment.id
        });

        setPaymentStep('success');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setPaymentStep('payment');
    }
  };

  const handleTrackService = () => {
    navigateTo('customer-dashboard');
  };

  const handleContactProvider = () => {
    alert('Contacting provider... In a real app, this would open a chat or call feature.');
  };

  const handleDownloadReceipt = () => {
    alert('Downloading receipt... In a real app, this would generate a PDF.');
  };

  const handleBackToBooking = () => {
    navigateTo('booking');
  };

  // Payment Step
  if (paymentStep === 'payment') {
    return (
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Payment
            </h1>
            <p className="text-gray-600">
              Secure payment for your service booking
            </p>
          </div>

          {/* Booking Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{bookingDetails.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {new Date(bookingDetails.date).toLocaleDateString()} at {bookingDetails.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-lg">৳{bookingDetails.total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                {paymentMethod === 'bkash' ? 'bKash Payment' : 'Nagad Payment'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  paymentMethod === 'bkash' ? 'bg-pink-100' : 'bg-orange-100'
                }`}>
                  <Phone className={`h-8 w-8 ${
                    paymentMethod === 'bkash' ? 'text-pink-600' : 'text-orange-600'
                  }`} />
                </div>
                <h3 className="font-semibold mb-2">
                  Pay with {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'}
                </h3>
                <p className="text-gray-600 text-sm">
                  Enter your mobile wallet details to complete the payment
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin">PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="Enter your PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleBackToBooking}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className={`flex-1 ${
                    paymentMethod === 'bkash' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                  onClick={handlePayment}
                >
                  Pay ৳{bookingDetails.total}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Processing Step
  if (paymentStep === 'processing') {
    return (
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card>
              <CardContent className="p-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Processing Payment</h2>
                  <p className="text-gray-600">Please wait while we process your payment...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Success Step
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment & Receipt
          </h1>
          <p className="text-gray-600">
            Your payment details and digital receipt
          </p>
        </div>

        {/* Payment Status */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Payment Successful</h2>
                <p className="text-gray-600">Your booking has been confirmed</p>
              </div>
            </div>
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                Transaction ID: {bookingDetails.transactionId}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Digital Receipt
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleDownloadReceipt}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Details */}
            <div>
              <h3 className="font-semibold mb-3">Service Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">{bookingDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{bookingDetails.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-medium">{bookingDetails.provider}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date & Time:
                  </span>
                  <span className="font-medium">
                    {new Date(bookingDetails.date).toLocaleDateString()} at {bookingDetails.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location:
                  </span>
                  <span className="font-medium text-right">{bookingDetails.address}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Details */}
            <div>
              <h3 className="font-semibold mb-3">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{bookingDetails.customer}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Breakdown */}
            <div>
              <h3 className="font-semibold mb-3">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge:</span>
                  <span>৳{bookingDetails.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Tax (10%):</span>
                  <span>৳{bookingDetails.tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>৳{bookingDetails.total}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-gray-600">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Payment Method:
                  </span>
                  <span className="font-medium text-pink-600">{bookingDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{bookingDetails.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleTrackService}
              >
                Track Service
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleContactProvider}
              >
                Contact Provider
              </Button>
            </div>

            {/* Footer Note */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>Thank you for choosing FixMaster!</p>
              <p>For any queries, contact us at support@fixmaster.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}