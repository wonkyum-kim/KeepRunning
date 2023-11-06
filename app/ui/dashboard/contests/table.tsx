'use client';

import type { Contest } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

interface TableProps {
  currentPage: number;
  data: Contest;
}

export default function Table({ currentPage, data }: TableProps) {
  const {
    place: oriPlace,
    host: oriHost,
    day: oriDay,
    date: oriDate,
    contest: oriContest,
    length: oriLength,
    id: oriId,
  } = data;

  const min = (currentPage - 1) * 10;
  const max = Math.min(min + 10, oriPlace.length);
  const place = oriPlace.slice(min, max);
  const host = oriHost.slice(min, max);
  const day = oriDay.slice(min, max);
  const date = oriDate.slice(min, max);
  const contest = oriContest.slice(min, max);
  const length = oriLength.slice(min, max);
  const id = oriId.slice(min, max);

  const router = useRouter();

  return (
    <div className='min-w-full h-[800px] py-5 px-2 overflow-auto bg-gray-50 rounded-lg hidden md:block'>
      <table className='min-w-full h-full text-gray-900'>
        <thead className='text-left text-2xl font-normal'>
          <tr>
            <th className='py-8'>날짜</th>
            <th className='py-8'>대회</th>
            <th className='py-8'>장소</th>
            <th className='py-8'>종목</th>
            <th className='py-8'>주최</th>
          </tr>
        </thead>
        <tbody className='bg-white overflow-x-auto '>
          {contest.map((contestName, index) => {
            return (
              <tr
                key={contestName}
                className='whitespace-nowrap min-h-full text-left text-lg cursor-pointer hover:bg-gray-100 border-b last-of-type:border-none [&:first-child>th:first-child]:rounded-tl-lg [&:first-child>th:last-child]:rounded-tr-lg [&:last-child>th:first-child]:rounded-bl-lg [&:last-child>th:last-child]:rounded-br-lg'
                onClick={() => {
                  router.push(`/dashboard/contests/${id[index]}`);
                }}
              >
                <th>
                  {date[index]} {day[index]}
                </th>
                <th>{contestName}</th>
                <th>{place[index]}</th>
                <th className='text-red-500'>{length[index]}</th>
                <th>{host[index]}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
