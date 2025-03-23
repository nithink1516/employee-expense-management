import React, { useState } from 'react';
import { ReceiptCapture } from '@/components/receipt-capture/ReceiptCapture';
import { ExpensePreview } from '@/components/receipt-capture/ExpensePreview';
import { PolicyCheck } from '@/components/receipt-capture/PolicyCheck';
import { ConfirmationScreen } from '@/components/receipt-capture/ConfirmationScreen';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import type { ExpenseData } from '@/types/expense';

interface ExpenseCapturePageProps {
  onBack: () => void;
}

export const ExpenseCapturePage: React.FC<ExpenseCapturePageProps> = ({ onBack }) => {
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
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep((prev) => Math.max(0, prev - 1));
    }
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

  // Function to handle view all expenses
  const handleViewAllExpenses = () => {
    onBack();
  };

  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Capture Receipt</h1>
            </div>
            <ReceiptCapture onCaptureComplete={handleCaptureComplete} />
          </>
        );
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
          onViewAllExpenses={handleViewAllExpenses}
        />;
      default:
        return <ReceiptCapture onCaptureComplete={handleCaptureComplete} />;
    }
  };

  return (
    <div className="w-full mx-auto h-full flex flex-col p-4">
      {renderStep()}
    </div>
  );
};
