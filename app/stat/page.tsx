// 'use client';

import Link from 'next/link';

export default function Stat() {
  return (
    <div className='w-full min-h-[720px]'>
      <div>
        <h1 className='text-xl font-bold pb-4'>러닝 통계</h1>
        <p className='bg-[#eee] rounded-lg p-4'>
          당신의 달리기 시간을 동료 주자들의 시간과 비교해보세요.
          <br />
          결과는 지난 20년 동안 28,000개 이상의 경주에서 수집된 3,500만 개의
          결과를 기반으로 합니다.
        </p>
        <p className='py-4'>
          자료 제공:{' '}
          <Link
            className='font-bold text-blue-500'
            href='https://runrepeat.com/how-do-you-masure-up-the-runners-percentile-calculator#5k-finish-times-comparisons'
          >
            RunRepeat
          </Link>
        </p>
      </div>
      <iframe
        className='w-full h-full'
        src='https://runrepeat.com/calculator/runner-performance'
      ></iframe>
    </div>
  );
}
