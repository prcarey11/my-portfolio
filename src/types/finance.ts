export type Transaction = {
  id: string;
  description: string;
  amount: number; // can be positive or negative
  category: string;
  type: 'income' | 'expense';
  date: string; // ISO string (e.g. 2024-07-15)
};
