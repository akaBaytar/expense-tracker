'use server';

import { auth } from '@clerk/nextjs/server';

import { database } from '@/lib/database';

interface Balance {
  balance?: number;
  error?: string;
}

const getBalance = async (): Promise<Balance> => {
  const { userId } = auth();

  if (!userId) return { error: 'User not found.' };

  try {
    const transactions = await database.transaction.findMany({
      where: { userId },
    });

    const balance = parseFloat(
      transactions.reduce((acc, ta) => acc + ta.amount, 0).toFixed(2)
    );

    return { balance };
  } catch (error) {
    return { error: 'Database error, try again later.' };
  }
};

export default getBalance;
