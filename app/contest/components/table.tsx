'use client';

import type { Contest } from '@/app/actions/getContests';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface TableProps {
  page: number;
  data: Contest;
}

export default function Table({ page, data }: TableProps) {
  const min = (page - 1) * 10;
  const max = Math.min(min + 10, data.place.length);

  const contests: Contest = {
    place: data.place.slice(min, max),
    host: data.host.slice(min, max),
    day: data.day.slice(min, max),
    date: data.date.slice(min, max),
    names: data.names.slice(min, max),
    types: data.types.slice(min, max),
    id: data.id.slice(min, max),
  };

  const router = useRouter();

  const moveHandler = (index: number) => {
    router.push(`/contest/${contests.id[index]}`);
  };

  const blank = 10 - contests.names.length;
  const blankDivs = [];
  for (let i = 0; i < blank; ++i) {
    blankDivs.push(<div className='w-full h-[50px] select-none' />);
  }

  return (
    <div className='w-full grid grid-rows-10'>
      {contests.names.map((name, index) => {
        return (
          <div
            key={name}
            onClick={() => moveHandler(index)}
            className={clsx(
              'h-[50px] px-4 w-full flex items-center justify-between cursor-pointer hover:bg-[#eee]',
              index !== 0 && 'border-t-2'
            )}
          >
            <p>{name}</p>
            <p>
              {contests.date[index]}
              {contests.day[index]}
            </p>
          </div>
        );
      })}
      {blankDivs.map((b) => b)}
    </div>
  );
}
