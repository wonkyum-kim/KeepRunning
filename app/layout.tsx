import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import './globals.css';
import Link from 'next/link';
import Weather from './ui/main/weather';
import Dashboard from './ui/main/dashboard';

export const metadata: Metadata = {
  openGraph: {
    title: 'Keep Running',
    description: '나의 달린 기록을 확인하고 대회 정보를 얻어보자.',
    type: 'website',
    images: [
      {
        url: '/together.png',
        alt: 'togheter',
      },
    ],
  },
  title: 'Keep Running',
  description: '달린 기록을 확인하고 대회 정보를 알아봅시다.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body
        className={`${inter.className} antialiased flex flex-col gap-4 w-full h-auto p-4 md:w-[768px] m-auto`}
      >
        <div className='w-full rounded-lg bg-blue-500 p-2 md:p-4 md:h-40 flex justify-between items-center'>
          <Link
            href='/'
            className='h-full text-white font-bold text-xl flex items-center select-none cursor-pointer justify-center md:justify-start md:items-end md:text-6xl md:p-4'
          >
            Keep Running
          </Link>
          <Weather />
        </div>
        {children}
        <Dashboard />
      </body>
    </html>
  );
}
