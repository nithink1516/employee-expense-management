
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Edit2, Calendar } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { ExpenseData } from '@/pages/Index';

interface ExpensePreviewProps {
  expenseData: ExpenseData;
  updateExpenseData: (data: Partial<ExpenseData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ExpensePreview: React.FC<ExpensePreviewProps> = ({ 
  expenseData, 
  updateExpenseData, 
  onNext, 
  onBack 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateExpenseData({ [name]: value });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Review Expense</h1>
      </div>

      {/* Receipt thumbnail */}
      <div className="mb-4">
        <Label className="mb-2 block text-sm">Receipt Image</Label>
        <div className="w-full max-w-[120px] rounded-md overflow-hidden border">
          <AspectRatio ratio={3/4}>
            <img 
              src={expenseData.imageUrl || "https://via.placeholder.com/300x400?text=Receipt"} 
              alt="Receipt" 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="flex justify-between">
            Amount 
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input 
              id="amount" 
              name="amount" 
              value={expenseData.amount} 
              onChange={handleChange} 
              className="pl-7" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="flex justify-between">
            Date
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </Label>
          <Input 
            id="date" 
            name="date" 
            type="date" 
            value={expenseData.date} 
            onChange={handleChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendor" className="flex justify-between">
            Vendor
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </Label>
          <Input 
            id="vendor" 
            name="vendor" 
            value={expenseData.vendor} 
            onChange={handleChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="flex justify-between">
            Category
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </Label>
          <select 
            id="category" 
            name="category" 
            value={expenseData.category} 
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="Meals">Meals</option>
            <option value="Travel">Travel</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Add Notes (Optional)</Label>
          <Textarea 
            id="notes" 
            name="notes" 
            placeholder="Add context, like 'Team lunch'" 
            value={expenseData.notes || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <Button className="w-full mt-6" onClick={onNext}>
        Continue
      </Button>
    </div>
  );
};
