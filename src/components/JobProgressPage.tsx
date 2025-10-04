import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft,
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  User,
  Camera,
  FileText,
  AlertTriangle,
  Briefcase
} from 'lucide-react';

interface JobProgressPageProps {
  navigateTo: (page: string) => void;
  jobData?: any;
}

export function JobProgressPage({ navigateTo, jobData }: JobProgressPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobNotes, setJobNotes] = useState('');
  const [workPhotos, setWorkPhotos] = useState<string[]>([]);

  // Demo job data
  const job = jobData || {
    id: "JB001",
    service: "Plumbing Repair",
    customer: "Sarah Ahmed",
    address: "House 12, Road 5, Dhanmondi",
    phone: "+880 1xxx-xxx001",
    description: "Kitchen sink leakage and bathroom pipe repair",
    price: 500,
    startTime: new Date().toLocaleTimeString()
  };

  const progressSteps = [
    { id: 1, title: "Job Started", description: "Arrived at location", completed: true },
    { id: 2, title: "Assessment", description: "Diagnosing the problem", completed: currentStep >= 2 },
    { id: 3, title: "Work in Progress", description: "Performing repairs", completed: currentStep >= 3 },
    { id: 4, title: "Quality Check", description: "Testing and verification", completed: currentStep >= 4 },
    { id: 5, title: "Job Complete", description: "Work finished successfully", completed: currentStep >= 5 }
  ];

  const handleStepComplete = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteJob = () => {
    setCurrentStep(5);
    // In a real app, this would update the job status in the database
    setTimeout(() => {
      navigateTo('provider-dashboard');
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateTo('provider-dashboard')}
            className="btn-interactive"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Progress</h1>
            <p className="text-gray-600">Track and manage your current job</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {job.customer.split(' ').map((n: any) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.customer}</h3>
                    <p className="text-sm text-gray-600">{job.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <p className="text-sm text-gray-700">{job.address}</p>
                </div>

                <Button 
                  size="sm" 
                  className="w-full btn-interactive"
                  onClick={() => window.open(`tel:${job.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Service</label>
                  <p className="text-gray-900">{job.service}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-700">{job.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Started At</label>
                  <p className="text-sm text-gray-900">{job.startTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Estimated Cost</label>
                  <p className="text-lg font-semibold text-green-600">৳{job.price}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {progressSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : currentStep === step.id 
                            ? 'bg-orange-500 text-white animate-pulse' 
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-semibold">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${step.completed ? 'text-green-700' : currentStep === step.id ? 'text-orange-700' : 'text-gray-500'}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        {currentStep === step.id && currentStep < 5 && (
                          <Button 
                            size="sm" 
                            onClick={handleStepComplete}
                            className="mt-2 btn-interactive"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                      {index < progressSteps.length - 1 && (
                        <div className={`w-0.5 h-8 ml-5 -mb-4 ${
                          step.completed ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Job Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={jobNotes}
                  onChange={(e) => setJobNotes(e.target.value)}
                  placeholder="Add notes about the job progress, issues encountered, or work completed..."
                  className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                <Button 
                  size="sm" 
                  className="mt-2 btn-interactive"
                  disabled={!jobNotes.trim()}
                >
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* Work Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Work Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {workPhotos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  ))}
                  <div 
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors btn-interactive"
                    onClick={() => setWorkPhotos([...workPhotos, 'new-photo'])}
                  >
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Photo</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Photos help document your work and build customer trust
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {currentStep < 5 ? (
                <>
                  <Button 
                    variant="outline"
                    className="flex-1 btn-interactive"
                    onClick={() => navigateTo('provider-dashboard')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pause Job
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 btn-interactive"
                    onClick={handleCompleteJob}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Job
                  </Button>
                </>
              ) : (
                <div className="w-full text-center space-y-4">
                  <div className="bg-green-50 rounded-lg p-6">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Job Completed!</h3>
                    <p className="text-green-700 text-sm">
                      Great work! The job has been marked as complete.
                    </p>
                  </div>
                  <Button 
                    className="btn-interactive"
                    onClick={() => navigateTo('provider-dashboard')}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}