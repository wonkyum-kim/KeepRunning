import { getContestsById } from '@/app/lib/contest-id-data';
import { blackHansSans, gothicA1 } from '@/app/ui/fonts';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { name, date, event, place, apply, desc } = await getContestsById(
    params.id
  );

  const splitted = desc.split('<br />').filter((sp) => sp !== '\r\n');
  return (
    <div
      className={`${blackHansSans.className} antialiased w-full h-full flex flex-col p-4`}
    >
      <div className='text-5xl w-full h-40 flex items-center pl-4'>{name}</div>
      <div className='w-full h-full flex flex-col pl-4 gap-2 text-2xl'>
        <div>{`대회일시: ${date}`}</div>
        <div>{`대회장소: ${place}`}</div>
        <div>{`대회종목: ${event}`}</div>
        <div>{`접수기간: ${apply}`}</div>
        <div
          className={`bg-gray-50 w-full max-h-[500px] rounded-lg p-4 break-keep text-3xl flex flex-col gap-4 overflow-y-auto ${gothicA1.className} antialiased font-bold leading-10`}
        >
          {splitted.map((sp) => {
            return <div key={sp}>{sp}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
