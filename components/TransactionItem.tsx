import { toast } from 'react-toastify';

import { Transaction } from '@/types/Transaction';
import { addComma } from '@/util/addComma';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}
        {addComma(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default TransactionItem;
