import { getContestsById } from '@/app/libs/contest-id-data';
import { blackHansSans, gothicA1 } from '@/app/ui/fonts';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { name, date, event, place, apply, desc, link } = await getContestsById(
    params.id
  );

  const dueDate = apply.split('~')[1].split(/(년|월|일)/);
  const a = new Date(`${dueDate[0]}-${dueDate[2]}-${dueDate[4]}`);
  const b = new Date();
  const isLate = a < b;

  // const timeDiff = Math.abs(b - a);
  // const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const splitted = desc.split('<br />').filter((sp) => sp !== '\r\n');

  return (
    <div
      className={`${blackHansSans.className} antialiased w-full h-full flex flex-col gap-4 p-4`}
    >
      <div className='flex flex-col md:flex-row items-center gap-4'>
        <div className='text-3xl font-bold md:text-5xl md:h-40 flex items-center pl-4'>
          {name}
        </div>
        {!isLate && (
          <Link
            href={`http://${link}`}
            className='bg-red-500 h-12 text-white flex items-center p-4 rounded-lg text-xl hover:animate-bounce'
          >
            신청하러 가기
          </Link>
        )}
        {isLate && (
          <div className='bg-gray-500 h-12 text-white flex items-center p-4 rounded-lg text-xl'>
            접수 마감
          </div>
        )}
      </div>
      <div className='w-full h-full flex flex-col pl-4 py-2 gap-4 text-2xl'>
        <div>{`대회일시: ${date}`}</div>
        <div>{`대회장소: ${place}`}</div>
        <div>{`대회종목: ${event}`}</div>
        <div>{`접수기간: ${apply}`}</div>
        <div
          className={`mt-4 bg-gray-50 w-full max-h-[500px] rounded-lg p-4 break-keep text-3xl flex flex-col gap-4 overflow-y-auto ${gothicA1.className} antialiased font-bold leading-10`}
        >
          {splitted.map((sp) => {
            return <div key={sp}>{sp}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
