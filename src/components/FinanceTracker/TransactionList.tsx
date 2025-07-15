import React from 'react';
import { Transaction } from '../../types/finance';
import TransactionItem from './TransactionItem';
import './TransactionList.css';

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
};

const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
