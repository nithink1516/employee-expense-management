
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, AlertTriangle, Save } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { ExpenseData } from '@/pages/Index';

interface PolicyCheckProps {
  expenseData: ExpenseData;
  onSubmit: () => void;
  onSaveForLater: () => void;
  onBack: () => void;
}

export const PolicyCheck: React.FC<PolicyCheckProps> = ({ 
  expenseData, 
  onSubmit, 
  onSaveForLater,
  onBack 
}) => {
  const hasPolicyViolations = expenseData.policyViolations && expenseData.policyViolations.length > 0;
  
  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Submit Expense</h1>
      </div>

      {/* Policy alert banner */}
      {hasPolicyViolations && (
        <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Policy Alert</AlertTitle>
          <AlertDescription>
            {expenseData.policyViolations!.map((violation, index) => (
              <p key={index}>{violation}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Expense summary */}
      <div className="rounded-lg border p-4 space-y-3">
        <h2 className="font-medium">Expense Summary</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">${expenseData.amount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vendor:</span>
            <span>{expenseData.vendor}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <span>{expenseData.category}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{expenseData.date}</span>
          </div>
          
          {expenseData.notes && (
            <div className="pt-2">
              <span className="text-muted-foreground block">Notes:</span>
              <p className="text-sm mt-1">{expenseData.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Button className="w-full" onClick={onSubmit}>
          Submit Expense
        </Button>
        
        <Button variant="outline" className="w-full" onClick={onSaveForLater}>
          <Save className="mr-2 h-4 w-4" />
          Save for Later
        </Button>
      </div>
    </div>
  );
};
