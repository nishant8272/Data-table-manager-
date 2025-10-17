import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Layout/Providers';
import AppBar from '@/components/Layout/AppBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dynamic Data Table Manager',
  description: 'Next.js, Redux Toolkit, and Material UI Data Table',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppBar />
          <main style={{ padding: '24px' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}