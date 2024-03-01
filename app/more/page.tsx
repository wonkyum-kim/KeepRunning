import Link from 'next/link';

export default function MorePage() {
  return (
    <div className='w-full flex flex-col gap-4 text-xl font-bold'>
      <h1 className='px-4'>더보기</h1>
      <hr />
      <Link href='/stat' className='hover:bg-[#eee] p-4 rounded-lg'>
        📌 러닝 통계 비교
      </Link>
      <Link href='/contest' className='hover:bg-[#eee] p-4 rounded-lg'>
        📅 대회 일정 확인
      </Link>
      <div className='hover:bg-[#eee] p-4 rounded-lg cursor-not-allowed'>
        TODO: 내 일정
      </div>
      <div className='hover:bg-[#eee] p-4 rounded-lg cursor-not-allowed'>
        TODO: 개발자 정보
      </div>
    </div>
  );
}
