import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col gap-4 w-full h-full p-8'>
      <div className='h-20 w-full rounded-lg bg-blue-500 p-4 md:h-52'>
        <Link
          href='/'
          className='w-full h-full flex items-end justify-center md:justify-start text-white font-bold text-3xl md:text-7xl md:p-4 antialiased select-none cursor-pointer'
        >
          Keep Running
        </Link>
      </div>
      <div className='w-full h-full flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col gap-8 w-full h-2/5 md:w-2/5 md:h-full bg-gray-50 rounded-lg items-center justify-center p-4'>
          <p className='text-gray-800 lg:text-lg xl:text-2xl md:leading-loose'>
            <strong>러닝</strong> 계획을 정하고 성과를 기록해보세요.
          </p>
          <button className='bg-blue-500 hover:bg-blue-400 text-white w-60 h-14 rounded-lg lg:text-lg xl:text-2xl'>
            지금 시작해보기
          </button>
        </div>
        <div className='w-full h-full relative'>
          <Image
            alt='running'
            src='/together.png'
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </main>
  );
}
