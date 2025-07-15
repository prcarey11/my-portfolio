import React, { useState } from 'react';
import { Transaction } from '../../types/finance';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onAdd: (transaction: Transaction) => void;
};

const AddTransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // yyyy-mm-dd

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !category) return;

    const transaction: Transaction = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    onAdd(transaction);

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
    setType('expense');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />

      <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
