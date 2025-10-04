import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

interface ContactPageProps {
  navigateTo: (page: string) => void;
}

export function ContactPage({ navigateTo }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "You can book a service by browsing our services page, selecting your preferred service, choosing a provider, and filling out the booking form with your preferred date and time."
    },
    {
      question: "Are all service providers verified?",
      answer: "Yes, all our service providers go through a comprehensive verification process including identity checks, professional license validation, and background screening."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash payments, bKash, and Nagad. You can select your preferred payment method during the booking process."
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule your booking up to 2 hours before the scheduled time. Please contact our support team or use your customer dashboard."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "If you're not satisfied with the service, please contact our support team within 24 hours. We offer a satisfaction guarantee and will work to resolve any issues."
    },
    {
      question: "How do I become a service provider?",
      answer: "To become a service provider, you need to apply through our provider registration page, complete the verification process, and pass our quality assessment."
    },
    {
      question: "Do you provide emergency services?",
      answer: "Yes, we offer emergency services for urgent situations like plumbing emergencies, electrical issues, and AC repairs. Emergency services may have additional charges."
    },
    {
      question: "What areas do you cover?",
      answer: "Currently, we provide services across major areas in Dhaka including Gulshan, Dhanmondi, Uttara, Banani, Mirpur, and surrounding neighborhoods."
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-blue-500" />,
      title: "Phone Support",
      info: "+880 1xxx-xxxxxx",
      description: "Available 24/7 for urgent matters"
    },
    {
      icon: <Mail className="h-6 w-6 text-green-500" />,
      title: "Email Support", 
      info: "support@fixmaster.com",
      description: "We'll respond within 2 hours"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
      title: "Live Chat",
      info: "Chat with us now",
      description: "Instant support during business hours"
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      title: "Office Location",
      info: "Dhaka, Bangladesh",
      description: "Visit us for in-person support"
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help? We're here to assist you. Reach out to us through any of the methods below 
            or check our FAQ for quick answers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+880 1xxx-xxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="Brief subject of your message"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you within 2 hours.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-1">
                        {method.info}
                      </p>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 bg-blue-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Monday - Friday:</span>
                    <span className="text-blue-600">8:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Saturday:</span>
                    <span className="text-blue-600">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Sunday:</span>
                    <span className="text-blue-600">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Emergency Support:</span>
                      <span className="text-blue-600">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-6 w-6 text-blue-500" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contact */}
        <section className="mt-12">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Emergency Support
                  </h3>
                  <p className="text-red-700">
                    For urgent service needs outside business hours, contact our emergency line.
                  </p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Line
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}