import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <aside className='bottom-0 left-0 z-10 fixed w-full flex items-center justify-center h-[55px]'>
      <nav className='bg-[#eee] w-full h-full md:w-[768px] grid grid-cols-4'>
        <Link
          href={'/'}
          className='flex flex-col items-center justify-center select-none'
        >
          <div>🏠</div>
          <div>홈</div>
        </Link>
        <Link
          href={'/record'}
          className='flex flex-col items-center justify-center select-none'
        >
          <div>🖼️</div>
          <div>기록 인증</div>
        </Link>
        <Link
          href={'/mileage'}
          className='flex flex-col items-center justify-center select-none'
        >
          <div>📝</div>
          <div>마일리지</div>
        </Link>
        <Link
          href={'/more'}
          className='flex flex-col items-center justify-center select-none'
        >
          <div>
            <MoreHorizontal />
          </div>
          <div>더보기</div>
        </Link>
      </nav>
    </aside>
  );
}
