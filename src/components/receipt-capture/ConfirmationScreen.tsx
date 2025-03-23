
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, List, ArrowRight, Clock, BarChart, Plus, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with user info */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>NT</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Welcome back</p>
            <p className="text-xs text-muted-foreground">Nithin T</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          $1,240.50 Available
        </Badge>
      </div>
      
      {/* Success animation and message */}
      <div className="flex flex-col items-center justify-center px-4 py-8 space-y-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-[1.2] opacity-30 animate-pulse"></div>
          <div className="rounded-full bg-green-100 p-4 relative">
            <Check className="h-10 w-10 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Expense Submitted!</h1>
          <p className="text-muted-foreground">Your expense has been successfully submitted for review.</p>
        </div>
      </div>
      
      {/* Expense summary card */}
      <Card className="mx-4 mb-6 border-none shadow-md">
        <CardContent className="p-4 space-y-4">
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
          
          <Separator />
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="rounded-md py-0 h-6">
                {expenseData.category}
              </Badge>
            </div>
            <span className="text-muted-foreground">{expenseData.date}</span>
          </div>
          
          {/* Receipt thumbnail */}
          {expenseData.imageUrl && (
            <div className="mt-4 flex justify-center">
              <div className="relative w-24 h-32 border rounded-md overflow-hidden bg-gray-50">
                <img 
                  src={expenseData.imageUrl} 
                  alt="Receipt" 
                  className="object-contain w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent h-8"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Recent Expenses Preview */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Recent Expenses</h2>
          <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={onViewAllExpenses}>
            <span className="text-sm">View All</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {/* Recent expense items */}
          {[
            { vendor: 'Uber', amount: '24.50', date: 'Today', status: 'pending' },
            { vendor: 'Office Supplies', amount: '85.20', date: 'Yesterday', status: 'approved' }
          ].map((expense, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    expense.status === 'approved' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    <div className={`h-2 w-2 rounded-full ${
                      expense.status === 'approved' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{expense.vendor}</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                <p className="font-medium">${expense.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="mt-auto fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
        <div className="flex justify-around py-3 px-2 items-center">
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1" onClick={onViewAllExpenses}>
            <List className="h-5 w-5 mb-1" />
            <span className="text-xs">Expenses</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
            <Clock className="h-5 w-5 mb-1" />
            <span className="text-xs">History</span>
          </Button>
          
          <Button className="flex flex-col items-center h-12 w-12 rounded-full shadow-md">
            <Plus className="h-6 w-6" />
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">Search</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
            <BarChart className="h-5 w-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
