import React, { useState, useEffect } from 'react';
import { Transaction } from '../../types/finance';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onAdd: (transaction: Transaction) => void;
};

// Validation function moved outside component for stable reference
const validate = (
  description: string,
  amount: string,
  category: string
): { [key: string]: string } => {
  const newErrors: { [key: string]: string } = {};

  if (!description.trim()) newErrors.description = 'Description is required';
  if (!category.trim()) newErrors.category = 'Category is required';

  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0)
    newErrors.amount = 'Amount must be a positive number';

  return newErrors;
};

const AddTransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validationErrors = validate(description, amount, category);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [description, amount, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(description, amount, category);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
    setErrors({});
  };

  return (
    <div className="transaction-card">
      <form className="add-transaction-form" onSubmit={handleSubmit} noValidate>
        <h2>Add Transaction</h2>

        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby="desc-error"
          />
          {errors.description && (
            <small id="desc-error" style={{ color: 'red' }}>
              {errors.description}
            </small>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            aria-invalid={!!errors.amount}
            aria-describedby="amount-error"
          />
          {errors.amount && (
            <small id="amount-error" style={{ color: 'red' }}>
              {errors.amount}
            </small>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-invalid={!!errors.category}
            aria-describedby="category-error"
          />
          {errors.category && (
            <small id="category-error" style={{ color: 'red' }}>
              {errors.category}
            </small>
          )}
        </div>

        <div>
          <label>
            Type:
            <select
              value={type}
              onChange={e => setType(e.target.value as 'income' | 'expense')}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" disabled={!isValid}>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
