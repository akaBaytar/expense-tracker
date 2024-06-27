import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';
import 'react-toastify/ReactToastify.min.css';

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
          <Footer />
          <ToastContainer style={{ marginBlockStart: '-13px' }} />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
