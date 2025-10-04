// Mock database for FixMaster platform
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type: 'customer' | 'provider';
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  duration: string;
  image: string;
  isActive: boolean;
}

export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  specialties: string[];
  experience: number;
  rating: number;
  totalReviews: number;
  verified: boolean;
  availability: string[];
  serviceArea: string[];
  priceRange: string;
  description: string;
  images: string[];
  certifications: string[];
  totalJobs: number;
  responseTime: string;
  location: string;
}

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  description: string;
  estimatedCost: number;
  finalCost?: number;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cancellationReason?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  providerId: string;
  amount: number;
  method: 'card' | 'mobile-banking' | 'cash';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
  metadata?: any;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  providerId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'review' | 'system';
  read: boolean;
  createdAt: string;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Ahmed Rahman',
    email: 'customer@test.com',
    password: 'password',
    type: 'customer',
    phone: '+8801712345678',
    address: 'Dhanmondi, Dhaka',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    password: 'password123',
    type: 'customer',
    phone: '+8801812345678',
    address: 'Gulshan, Dhaka',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b131?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'user-3',
    name: 'Mohammad Ali',
    email: 'provider@test.com',
    password: 'password',
    type: 'provider',
    phone: '+8801912345678',
    address: 'Uttara, Dhaka',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'user-4',
    name: 'Rashida Begum',
    email: 'rashida@example.com',
    password: 'password123',
    type: 'provider',
    phone: '+8801612345678',
    address: 'Mirpur, Dhaka',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  }
];

export const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'AC Repair & Maintenance',
    category: 'Appliance Repair',
    description: 'Professional air conditioning repair and maintenance services',
    basePrice: 1500,
    duration: '2-3 hours',
    image: 'https://images.unsplash.com/photo-1631545806609-37c6cc56ff7c?w=400&h=300&fit=crop',
    isActive: true
  },
  {
    id: 'service-2',
    name: 'Plumbing Services',
    category: 'Home Repair',
    description: 'Complete plumbing solutions including leak repair and pipe installation',
    basePrice: 800,
    duration: '1-2 hours',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    isActive: true
  },
  {
    id: 'service-3',
    name: 'Electrical Repair',
    category: 'Home Repair',
    description: 'Electrical wiring, socket installation, and circuit repair',
    basePrice: 1000,
    duration: '1-3 hours',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
    isActive: true
  },
  {
    id: 'service-4',
    name: 'House Cleaning',
    category: 'Cleaning',
    description: 'Deep cleaning services for homes and apartments',
    basePrice: 2000,
    duration: '3-4 hours',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    isActive: true
  }
];

export const mockProviders: Provider[] = [
  {
    id: 'provider-1',
    userId: 'user-3',
    businessName: 'Ali Electronics',
    specialties: ['AC Repair', 'Electrical Work', 'Appliance Repair'],
    experience: 8,
    rating: 4.8,
    totalReviews: 156,
    verified: true,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    serviceArea: ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara'],
    priceRange: '৳800 - ৳3000',
    description: 'Expert in electrical repairs and AC maintenance with 8 years of experience.',
    images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1631545806609-37c6cc56ff7c?w=400&h=300&fit=crop'
    ],
    certifications: ['Certified Electrician', 'AC Technician License'],
    totalJobs: 234,
    responseTime: '30 minutes',
    location: 'Uttara, Dhaka'
  },
  {
    id: 'provider-2',
    userId: 'user-4',
    businessName: 'Rashida Home Services',
    specialties: ['House Cleaning', 'Deep Cleaning', 'Office Cleaning'],
    experience: 5,
    rating: 4.6,
    totalReviews: 89,
    verified: true,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    serviceArea: ['Mirpur', 'Dhanmondi', 'Mohammadpur'],
    priceRange: '৳1500 - ৳5000',
    description: 'Professional cleaning services with attention to detail and customer satisfaction.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    certifications: ['Professional Cleaning Certificate'],
    totalJobs: 112,
    responseTime: '45 minutes',
    location: 'Mirpur, Dhaka'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    customerId: 'user-1',
    providerId: 'provider-1',
    serviceId: 'service-1',
    status: 'completed',
    scheduledDate: '2024-01-25',
    scheduledTime: '10:00',
    address: 'House 25, Road 7, Dhanmondi, Dhaka',
    description: 'AC not cooling properly, needs inspection and repair',
    estimatedCost: 2000,
    finalCost: 1800,
    paymentId: 'payment-1',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-25T14:00:00Z',
    completedAt: '2024-01-25T14:00:00Z'
  },
  {
    id: 'booking-2',
    customerId: 'user-2',
    providerId: 'provider-2',
    serviceId: 'service-4',
    status: 'confirmed',
    scheduledDate: '2024-02-15',
    scheduledTime: '09:00',
    address: 'Apartment 4B, Gulshan Avenue, Dhaka',
    description: 'Deep cleaning for 3-bedroom apartment',
    estimatedCost: 3500,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-02-10T09:00:00Z'
  },
  {
    id: 'booking-3',
    customerId: 'user-1',
    providerId: 'provider-1',
    serviceId: 'service-3',
    status: 'pending',
    scheduledDate: '2024-02-20',
    scheduledTime: '14:00',
    address: 'House 25, Road 7, Dhanmondi, Dhaka',
    description: 'Install new electrical outlets in living room',
    estimatedCost: 1200,
    createdAt: '2024-02-12T16:00:00Z',
    updatedAt: '2024-02-12T16:00:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'payment-1',
    bookingId: 'booking-1',
    customerId: 'user-1',
    providerId: 'provider-1',
    amount: 1800,
    method: 'mobile-banking',
    status: 'completed',
    transactionId: 'TXN123456789',
    createdAt: '2024-01-25T14:00:00Z',
    completedAt: '2024-01-25T14:05:00Z',
    metadata: { 
      bkashNumber: '01712345678',
      reference: 'AC Repair Payment'
    }
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    bookingId: 'booking-1',
    customerId: 'user-1',
    providerId: 'provider-1',
    rating: 5,
    comment: 'Excellent service! Very professional and fixed the AC quickly.',
    createdAt: '2024-01-26T10:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'Booking Confirmed',
    message: 'Your AC repair booking has been confirmed for Jan 25, 10:00 AM',
    type: 'booking',
    read: false,
    createdAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-3',
    title: 'New Booking Request',
    message: 'New electrical repair booking request from Ahmed Rahman',
    type: 'booking',
    read: false,
    createdAt: '2024-02-12T16:05:00Z'
  }
];

// Database operations class
export class MockDatabase {
  private static users = [...mockUsers];
  private static services = [...mockServices];
  private static providers = [...mockProviders];
  private static bookings = [...mockBookings];
  private static payments = [...mockPayments];
  private static reviews = [...mockReviews];
  private static notifications = [...mockNotifications];

  // User operations
  static findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  static findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  static createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  static updateUser(id: string, updates: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { 
        ...this.users[userIndex], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      return this.users[userIndex];
    }
    return undefined;
  }

  // Provider operations
  static getProviders(): Provider[] {
    return this.providers;
  }

  static findProviderById(id: string): Provider | undefined {
    return this.providers.find(provider => provider.id === id);
  }

  static findProviderByUserId(userId: string): Provider | undefined {
    return this.providers.find(provider => provider.userId === userId);
  }

  // Service operations
  static getServices(): Service[] {
    return this.services.filter(service => service.isActive);
  }

  static findServiceById(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }

  // Booking operations
  static getBookingsByCustomerId(customerId: string): Booking[] {
    return this.bookings.filter(booking => booking.customerId === customerId);
  }

  static getBookingsByProviderId(providerId: string): Booking[] {
    return this.bookings.filter(booking => booking.providerId === providerId);
  }

  static findBookingById(id: string): Booking | undefined {
    return this.bookings.find(booking => booking.id === id);
  }

  static createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  static updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
    const bookingIndex = this.bookings.findIndex(booking => booking.id === id);
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex] = { 
        ...this.bookings[bookingIndex], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      return this.bookings[bookingIndex];
    }
    return undefined;
  }

  // Payment operations
  static findPaymentById(id: string): Payment | undefined {
    return this.payments.find(payment => payment.id === id);
  }

  static createPayment(paymentData: Omit<Payment, 'id' | 'createdAt'>): Payment {
    const newPayment: Payment = {
      ...paymentData,
      id: `payment-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  static updatePayment(id: string, updates: Partial<Payment>): Payment | undefined {
    const paymentIndex = this.payments.findIndex(payment => payment.id === id);
    if (paymentIndex !== -1) {
      this.payments[paymentIndex] = { 
        ...this.payments[paymentIndex], 
        ...updates 
      };
      return this.payments[paymentIndex];
    }
    return undefined;
  }

  // Review operations
  static getReviewsByProviderId(providerId: string): Review[] {
    return this.reviews.filter(review => review.providerId === providerId);
  }

  static createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Review {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.reviews.push(newReview);
    return newReview;
  }

  // Notification operations
  static getNotificationsByUserId(userId: string): Notification[] {
    return this.notifications.filter(notification => notification.userId === userId);
  }

  static createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const newNotification: Notification = {
      ...notificationData,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  static markNotificationAsRead(id: string): void {
    const notificationIndex = this.notifications.findIndex(notif => notif.id === id);
    if (notificationIndex !== -1) {
      this.notifications[notificationIndex].read = true;
    }
  }

  // Analytics and dashboard data
  static getCustomerAnalytics(customerId: string) {
    const bookings = this.getBookingsByCustomerId(customerId);
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const totalSpent = completedBookings.reduce((sum, b) => sum + (b.finalCost || b.estimatedCost), 0);
    
    return {
      totalBookings: bookings.length,
      completedBookings: completedBookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      totalSpent,
      favoriteServices: this.getMostUsedServices(customerId)
    };
  }

  static getProviderAnalytics(providerId: string) {
    const bookings = this.getBookingsByProviderId(providerId);
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.finalCost || b.estimatedCost), 0);
    const reviews = this.getReviewsByProviderId(providerId);
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    
    return {
      totalBookings: bookings.length,
      completedJobs: completedBookings.length,
      pendingJobs: bookings.filter(b => b.status === 'pending').length,
      totalEarnings,
      averageRating: avgRating,
      totalReviews: reviews.length
    };
  }

  private static getMostUsedServices(customerId: string): string[] {
    const bookings = this.getBookingsByCustomerId(customerId);
    const serviceCount: { [key: string]: number } = {};
    
    bookings.forEach(booking => {
      serviceCount[booking.serviceId] = (serviceCount[booking.serviceId] || 0) + 1;
    });
    
    return Object.entries(serviceCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([serviceId]) => {
        const service = this.findServiceById(serviceId);
        return service?.name || 'Unknown Service';
      });
  }
}