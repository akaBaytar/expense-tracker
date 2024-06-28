'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

import { database } from '@/lib/database';

interface Message {
  message?: string;
  error?: string;
}

const deleteTransaction = async (id: string): Promise<Message> => {
  const { userId } = auth();

  if (!userId) return { error: 'User not found.' };

  try {
    await database.transaction.delete({
      where: { id, userId },
    });

    revalidatePath('/');

    return { message: 'Transaction deleted.' };
  } catch (error) {
    return { error: 'Database error, try again later.' };
  }
};

export default deleteTransaction;
