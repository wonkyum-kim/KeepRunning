'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FaRunning } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';

const Links = [
  { name: '홈', href: '/dashboard' },
  { name: '대회 일정', href: '/dashboard/contests' },
  { name: '신발 관리', href: '/dashboard/shoes' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className='flex flex-col h-full w-full md:w-64 px-3 py-4 md:px-2 gap-2'>
      <Link
        href='/'
        className='flex h-20 w-full items-center justify-start pl-4 md:items-end md:justify-center rounded-md bg-blue-500 md:h-40 text-white text-3xl md:text-5xl font-bold md:p-2'
      >
        Keep Running
      </Link>
      <div className='flex flex-1 md:flex-col gap-2'>
        {Links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'w-full h-12 bg-gray-50 hover:bg-sky-100 rounded-md cursor-pointer font-bold flex items-center justify-center md:justify-start gap-2 md:p-2 text-lg',
                link.href === pathname && 'bg-sky-100 text-blue-600'
              )}
            >
              {link.name === '홈' && <AiFillHome />}
              {link.name === '대회 일정' && <FaRunning />}
              {link.name === '신발 관리' && <GiRunningShoe />}
              <p className='hidden md:block'>{link.name}</p>
            </Link>
          );
        })}
      </div>
      <div className='bg-gray-50 w-full h-full rounded-md hidden md:block'></div>
    </div>
  );
}
