import React from 'react';
import { Transaction } from '../../types/finance';

type Props = {
  transactions: Transaction[];
};

const BalanceSummary: React.FC<Props> = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="balance-summary">
      <h2>Summary</h2>
      <p><strong>Income:</strong> ${income.toFixed(2)}</p>
      <p><strong>Expenses:</strong> ${expenses.toFixed(2)}</p>
      <p><strong>Balance:</strong> ${balance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceSummary;
