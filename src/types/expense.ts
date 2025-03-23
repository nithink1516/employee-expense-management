
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
