
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, ListCheck, User, Plus } from 'lucide-react';
import { ExpenseCapturePage } from '@/components/expense-capture/ExpenseCapturePage';

const Index = () => {
  const [activeTab, setActiveTab] = React.useState('submit');
  const [showCaptureProcess, setShowCaptureProcess] = React.useState(false);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset capture process when switching tabs
    setShowCaptureProcess(false);
  };

  // Handle starting the capture process
  const handleStartCapture = () => {
    setShowCaptureProcess(true);
  };

  // Handle going back from capture process
  const handleBackFromCapture = () => {
    setShowCaptureProcess(false);
  };

  // Render the appropriate content based on active tab
  const renderContent = () => {
    if (showCaptureProcess) {
      return <ExpenseCapturePage onBack={handleBackFromCapture} />;
    }

    switch (activeTab) {
      case 'submit':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Submit Expense</h2>
              <p className="text-muted-foreground mt-2">
                Capture receipts and submit your expenses with ease
              </p>
            </div>
            
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Recent Expenses</h3>
                  <p className="text-sm text-muted-foreground">October 2023</p>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { vendor: 'Starbucks', date: 'Oct 15', amount: '$8.75', category: 'Meals' },
                  { vendor: 'Uber', date: 'Oct 12', amount: '$24.50', category: 'Travel' }
                ].map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{expense.vendor}</h4>
                      <p className="text-xs text-muted-foreground">{expense.date} • {expense.category}</p>
                    </div>
                    <p className="font-semibold">{expense.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating action button */}
            <Button 
              onClick={handleStartCapture}
              className="fixed bottom-20 right-6 rounded-full w-14 h-14 shadow-lg"
              size="icon"
            >
              <Camera className="h-6 w-6" />
            </Button>
          </div>
        );
      case 'track':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Track Expenses</h2>
              <p className="text-muted-foreground mt-2">
                Monitor your expense submissions and approval status
              </p>
            </div>
            
            <div className="w-full max-w-md space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-primary">4</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium mb-4">Monthly Summary</h3>
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-full max-w-md space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
                  <User size={36} />
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Marketing Department</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm divide-y">
                <div className="p-4 flex items-center justify-between">
                  <p className="font-medium">Personal Information</p>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-medium">Notification Settings</p>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-medium">Help & Support</p>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top App Bar */}
      <header className="bg-white border-b p-4 text-center sticky top-0 z-10">
        <h1 className="text-xl font-bold">ExpenseEase</h1>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pb-16">
        {renderContent()}
      </main>
      
      {/* Bottom Navigation */}
      {!showCaptureProcess && (
        <nav className="bg-white border-t fixed bottom-0 left-0 right-0 z-10">
          <div className="flex justify-around">
            <Button
              variant="ghost"
              className={`flex-1 flex flex-col items-center py-3 ${
                activeTab === 'submit' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => handleTabChange('submit')}
            >
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-xs">Submit</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 flex flex-col items-center py-3 ${
                activeTab === 'track' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => handleTabChange('track')}
            >
              <ListCheck className="h-5 w-5 mb-1" />
              <span className="text-xs">Track</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 flex flex-col items-center py-3 ${
                activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => handleTabChange('profile')}
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Index;
