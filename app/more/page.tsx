import Link from 'next/link';

export default function MorePage() {
  return (
    <div className='w-full flex flex-col p-4'>
      <Link href='/stat'>📌 러닝 통계 비교</Link>
      <Link href='contest'>📅 대회 일정 확인</Link>
      <div>TODO: cal heatmap 라이브러리 사용한 시각화</div>
      <div>TODO: 개발자 정보</div>
    </div>
  );
}
