'use server';

import { auth } from '@clerk/nextjs/server';

interface Transaction {
  name: string;
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

  const transaction: Transaction = { name, amount };

  return { data: transaction };
};

export default addTransaction;
