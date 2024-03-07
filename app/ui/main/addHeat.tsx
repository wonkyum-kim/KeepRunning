'use client';

import { useState } from 'react';
import { editDataFromIndexedDB, getAllDataFromIndexedDB } from '@/app/libs/idb';
import { useCalHeatmapStore } from '@/app/store/calHeatmapStore';
import { Heat } from './calHeat';
import { getDateString } from '@/app/libs/getDateString';

export default function AddHeat() {
  const todayString = getDateString(new Date());

  const [dateString, setDateString] = useState(todayString);

  const heats = useCalHeatmapStore((state) => state.heats);
  const setHeats = useCalHeatmapStore((state) => state.setHeats);

  const prevDist = heats.find((item) => item.date === dateString)?.dist ?? 0;

  const submitHander = async (formData: FormData) => {
    const date = formData.get('today') as string;
    const dist = +(formData.get('dist') as string);

    // 데이터를 수정한다.
    await editDataFromIndexedDB<Heat>(
      'calHeat',
      { id: date, date, dist },
      date
    );

    // re-render
    const newHeats = await getAllDataFromIndexedDB<Heat>('calHeat');
    setHeats(newHeats);
  };

  return (
    <form
      className='w-full flex flex-col gap-4'
      action={submitHander}
      data-testid='form'
    >
      <input
        data-testid='date-input'
        type='date'
        name='today'
        defaultValue={todayString}
        min='2024-01-01'
        max='2030-12-31'
        className='cursor-pointer w-full text-xl bg-sky-50 p-4 rounded-lg'
        onChange={(event) => {
          const selectedDate = event.target.value;
          setDateString(selectedDate);
        }}
      />
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <label htmlFor='dist' className='min-w-[80px]'>
            달린 거리:
          </label>
          <input
            data-testid='dist-input'
            type='number'
            step='0.01'
            id='dist'
            name='dist'
            key={dateString}
            defaultValue={prevDist}
            className='w-[100px] border-2 rounded-lg px-2'
          />
          <div>km</div>
        </div>
        <button
          type='submit'
          data-testid='submit-button'
          className='bg-blue-500 rounded-lg text-white p-1 w-[50px]'
        >
          제출
        </button>
      </div>
    </form>
  );
}
