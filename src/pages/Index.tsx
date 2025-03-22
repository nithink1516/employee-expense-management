
import React, { useState } from 'react';
import { ReceiptCapture } from '@/components/receipt-capture/ReceiptCapture';
import { ExpensePreview } from '@/components/receipt-capture/ExpensePreview';
import { PolicyCheck } from '@/components/receipt-capture/PolicyCheck';
import { ConfirmationScreen } from '@/components/receipt-capture/ConfirmationScreen';

// Define the expense data type
export type ExpenseData = {
  amount: string;
  date: string;
  vendor: string;
  category: string;
  notes?: string;
  imageUrl?: string;
  status?: 'pending' | 'approved' | 'rejected';
  policyViolations?: string[];
};

const Index = () => {
  // State to track the current step in the process
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // State to store the expense data
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    amount: '',
    date: '',
    vendor: '',
    category: '',
    notes: '',
    status: 'pending'
  });

  // Function to handle moving to the next step
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Function to handle going back to the previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  // Function to handle updating the expense data
  const updateExpenseData = (data: Partial<ExpenseData>) => {
    setExpenseData((prev) => ({ ...prev, ...data }));
  };

  // Function to handle receipt capture completion
  const handleCaptureComplete = (imageUrl: string) => {
    // In a real app, this would call an API to process the image with OCR
    // For the wireframe, we'll simulate AI extraction with mock data
    updateExpenseData({
      imageUrl,
      amount: '45.67',
      date: new Date().toISOString().split('T')[0],
      vendor: 'Starbucks',
      category: 'Meals',
      // Simulate policy check
      policyViolations: Math.random() > 0.5 ? ['This meal expense exceeds the $50 limit. It may require approval.'] : []
    });
    handleNext();
  };

  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ReceiptCapture onCaptureComplete={handleCaptureComplete} />;
      case 1:
        return <ExpensePreview 
          expenseData={expenseData} 
          updateExpenseData={updateExpenseData} 
          onNext={handleNext} 
          onBack={handleBack}
        />;
      case 2:
        return <PolicyCheck 
          expenseData={expenseData} 
          onSubmit={handleNext} 
          onSaveForLater={() => console.log('Saved for later')} 
          onBack={handleBack}
        />;
      case 3:
        return <ConfirmationScreen 
          expenseData={expenseData}
          onViewAllExpenses={() => console.log('View all expenses')}
        />;
      default:
        return <ReceiptCapture onCaptureComplete={handleCaptureComplete} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default Index;
