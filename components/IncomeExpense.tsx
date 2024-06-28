import getIncomeExpense from '@/func/getIncomeExpense';
import { addComma } from '@/util/addComma';

const IncomeExpense = async () => {
  const { expense, income } = await getIncomeExpense();
  return (
    <div className='inc-exp-container'>
      <div>
        <h4>Income</h4>
        <p className='money plus'>₺{addComma(income ?? 0)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className='money minus'>₺{addComma(expense ?? 0)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
