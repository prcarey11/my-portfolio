import React from 'react';
import { Transaction } from '../../types/finance';

type Props = {
  transaction: Transaction;
  onDelete: (id: string) => void;
};

const TransactionItem: React.FC<Props> = ({ transaction, onDelete }) => {
  const { id, description, amount, type, category, date } = transaction;

  return (
    <li className={`transaction-item ${type}`}>
      <div>
        <strong>{description}</strong> — ${amount.toFixed(2)} ({category})
        <br />
        <small>{new Date(date).toLocaleDateString()}</small>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default TransactionItem;
