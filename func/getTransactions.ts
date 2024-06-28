'use server';

import { auth } from '@clerk/nextjs/server';

import { database } from '@/lib/database';
import { Transaction } from '@/types/Transaction';

interface Transactions {
  transactions?: Transaction[];
  error?: string;
}

const getTransactions = async (): Promise<Transactions> => {
  const { userId } = auth();

  if (!userId) return { error: 'User not found.' };

  try {
    const transactions = await database.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return { transactions };
  } catch (error) {
    return { error: 'Database error, try again later.' };
  }
};

export default getTransactions;
