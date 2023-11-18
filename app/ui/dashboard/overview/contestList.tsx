import { getContests } from '@/app/libs/contests-data';
import type { Contest } from '@/app/libs/definitions';

export default async function ContestList() {
  const data = await getContests();
  const {
    place: oriPlace,
    host: oriHost,
    day: oriDay,
    date: oriDate,
    contest: oriContest,
    length: oriLength,
    id: oriId,
  } = data;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const startIndex = oriDate.findIndex((date) => {
    const [month, day] = date.split('/');
    return +month >= currentMonth && +day >= currentDay;
  });

  // 오늘 이후로 시작하는 대회 최대 5개까지만 보여준다.
  const endIndex = Math.min(oriDate.length, startIndex + 5);

  const date = oriDate.slice(startIndex, endIndex);
  const name = oriContest.slice(startIndex, endIndex);

  return (
    <div className='bg-red-300 text-white text-xl md:text-2xl p-4 rounded-lg flex flex-col gap-2 font-bold shadow-lg shadow-gray-400'>
      <div>대회 일정</div>
      {date.map((item, index) => {
        return (
          <div key={name[index]}>
            {item} {name[index]}
          </div>
        );
      })}
    </div>
  );
}
