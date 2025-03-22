
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, List } from 'lucide-react';
import type { ExpenseData } from '@/pages/Index';

interface ConfirmationScreenProps {
  expenseData: ExpenseData;
  onViewAllExpenses: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ 
  expenseData, 
  onViewAllExpenses 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-8 text-center">
      <div className="rounded-full bg-green-100 p-4">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Expense Submitted!</h1>
        <p className="text-muted-foreground">Your expense has been successfully submitted for review.</p>
      </div>
      
      {/* Expense summary card */}
      <div className="rounded-lg border p-6 w-full space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-medium">${expenseData.amount}</p>
            <p className="text-sm text-muted-foreground">{expenseData.vendor}</p>
          </div>
          
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm">Pending Approval</span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>{expenseData.category}</span>
          <span>{expenseData.date}</span>
        </div>
      </div>
      
      <Button className="mt-6" variant="outline" onClick={onViewAllExpenses}>
        <List className="mr-2 h-4 w-4" />
        View All Expenses
      </Button>
    </div>
  );
};
