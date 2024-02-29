import getContestById from '@/app/actions/getContestById';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { name, date, event, place, apply, desc, link } = await getContestById(
    params.id
  );

  const dueDate = apply.split('~')[1].split(/(년|월|일)/);
  const a = new Date(`${dueDate[0]}-${dueDate[2]}-${dueDate[4]}`);
  const b = new Date();
  const isLate = a < b;

  const splitted = desc.split('<br />').filter((sp) => sp !== '\r\n');

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold pb-4'>🏃‍♂️ {name}</h1>
        <div className='relative'>
          <hr />
          {isLate && (
            <div className='absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] bg-white text-red-500 text-xl font-bold px-[2px]'>
              접수 마감
            </div>
          )}
        </div>
      </div>
      <p>대회 일시: {date}</p>
      <p>대회 장소: {place}</p>
      <p>대회 종목: {event}</p>
      <p>접수 기간: {apply}</p>
      <p>
        대회 소개:
        <br /> {splitted}
      </p>
      <p>
        신청 링크:{' '}
        <Link className='text-blue-500' href={`http://${link}`}>
          {link}
        </Link>
      </p>
    </div>
  );
}
