import React, { useState, useEffect } from 'react';
import { Transaction } from '../../types/finance';
import AddTransactionForm from '../../components/FinanceTracker/AddTransactionForm';
import BalanceSummary from '../../components/FinanceTracker/BalanceSummary';
import TransactionList from '../../components/FinanceTracker/TransactionList';
import './FinanceTrackerPage.css';

const STORAGE_KEY = 'finance-tracker-transactions';

const FinanceTrackerPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="finance-tracker">
      <h1>Finance Tracker</h1>

      <BalanceSummary transactions={transactions} />

      <div className="transaction-card">
        <AddTransactionForm onAdd={addTransaction} />
      </div>

      <div className="transaction-list">
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default FinanceTrackerPage;
