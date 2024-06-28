'use server';

import { auth } from '@clerk/nextjs/server';

import { database } from '@/lib/database';

interface IncomeExpense {
  income?: number;
  expense?: number;
  error?: string;
}

const getIncomeExpense = async (): Promise<IncomeExpense> => {
  const { userId } = auth();

  if (!userId) return { error: 'User not found.' };

  try {
    const transactions = await database.transaction.findMany({
      where: { userId },
    });

    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: 'Database error, try again later.' };
  }
};

export default getIncomeExpense;
