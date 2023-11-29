import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Keep Running',
  description: '달린 기록을 확인하고 대회 정보를 알아봅시다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
