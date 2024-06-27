'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

import { database } from '@/lib/database';

interface Transaction {
  text: string;
  amount: number;
}

interface Result {
  data?: Transaction;
  error?: string;
}

const addTransaction = async (formData: FormData): Promise<Result> => {
  const nameValue = formData.get('name');
  const amountValue = formData.get('amount');

  if (!nameValue || !amountValue || nameValue === '') {
    return { error: 'Transaction name or amount is incomplete.' };
  }

  const name: string = nameValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const { userId } = auth();

  if (!userId) return { error: 'User not found.' };

  try {
    const transaction: Transaction = await database.transaction.create({
      data: {
        text: name,
        amount,
        userId,
      },
    });

    revalidatePath('/');

    return { data: transaction };
  } catch (error) {
    return { error: 'Transaction not added your account.' };
  }
};

export default addTransaction;
