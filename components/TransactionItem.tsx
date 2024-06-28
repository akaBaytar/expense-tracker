'use client';

import { toast } from 'react-toastify';

import { Transaction } from '@/types/Transaction';
import { addComma } from '@/util/addComma';
import deleteTransaction from '@/func/deleteTransaction';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const deleteTransactionHandler = async (id: string) => {
    const confirmed = window.confirm('Are you sure?');

    if (!confirmed) return;

    const { error, message } = await deleteTransaction(id);

    if (error) toast.error(error);

    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}
        {addComma(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => deleteTransactionHandler(transaction.id)}
        className='delete-button'>
        x
      </button>
    </li>
  );
};

export default TransactionItem;
