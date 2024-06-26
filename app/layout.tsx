import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import Header from '@/components/Header';

import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses and create a budget.',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={poppins.className}>
          <Header />
          <main className='container'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
