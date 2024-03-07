import Image from 'next/image';
import Link from 'next/link';

export default function Measurement() {
  return (
    <div className='w-full min-h-[720px] flex flex-col gap-4 mb-10'>
      <div>
        <h1 className='text-xl font-bold pb-4'>
          👣 올바른 신발 사이즈 선택하기
        </h1>
        <p className='bg-[#eee] rounded-lg p-4 break-all'>
          러닝화 구매 시 올바른 발 크기를 측정하는 법을 알아보세요.
          <br />
          <ul className='w-full h-full flex flex-col gap-2 pt-4'>
            <li>
              ✅ 러닝화는 일반적으로 발 길이보다 10 ~ 15mm 큰 사이즈를
              구매합니다.
            </li>
            <li>
              ✅ 남성의 경우 발 볼의 길이가 100 ~ 103mm를 넘어간다면 반 사이즈
              업을 고려해 보세요.
            </li>
            <li>✅ 일부 신발은 발볼이 넓은 모델(2E, 4E)도 출시합니다.</li>
            <li>
              ✅ 처음 구매하시는 신발은 매장에서 신어보시고 구매하시는 것을
              추천합니다.
            </li>
          </ul>
        </p>
        <p className='py-4'>
          사진 출처:{' '}
          <Link
            className='font-bold text-blue-500'
            href='https://brand.naver.com/hoka'
          >
            Hoka
          </Link>
        </p>
      </div>
      <Image
        src='/measure.jpg'
        width={800}
        height={800}
        alt='measure'
        className='w-full h-full'
      />
    </div>
  );
}
