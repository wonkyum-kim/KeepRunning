'use client';

import { getRunningStat } from '@/app/libs/getRunningStat';
import { useCalHeatmapStore } from '@/app/store/calHeatmapStore';
import { ChangeEventHandler, useState } from 'react';

const MONTH = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

export default function ShowResult() {
  const heats = useCalHeatmapStore((state) => state.heats);
  const year = useCalHeatmapStore((state) => state.year);
  const [month, setMonth] = useState('01');

  const { yearAcc, yearAvg, monthAcc, monthPlay, monthAvg } = getRunningStat(
    heats,
    year,
    month
  );

  const monthChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <h1 className='font-bold text-xl'>🏃 러닝 결산</h1>
      <p>
        {year}년 총 달린 거리: {yearAcc}km
      </p>
      <p>
        {year}년 평균 달린 거리: {yearAvg}km
      </p>
      <p>
        {year}년{' '}
        <select
          className='bg-[#eee] w-[50px] text-center'
          onChange={monthChangeHandler}
        >
          {MONTH.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>{' '}
        월
      </p>
      <div className='w-full grid grid-cols-3 place-items-center text-xl text-center'>
        <div className='flex flex-col'>
          <div className='font-bold'>{monthPlay}</div>
          <div>활동 수</div>
        </div>
        <div className='flex flex-col'>
          <div className='font-bold'>{monthAcc} km</div>
          <div>총 달린 거리</div>
        </div>
        <div className='flex flex-col'>
          <div className='font-bold'>{monthAvg} km</div>
          <div>평균 거리</div>
        </div>
      </div>
    </div>
  );
}
