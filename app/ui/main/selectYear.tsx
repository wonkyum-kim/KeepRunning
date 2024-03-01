'use client';

import { useCalHeatmapStore } from '@/app/store/calHeatmapStore';
import { ChangeEventHandler } from 'react';

export default function SelectYear() {
  const currYear = new Date().getFullYear();
  const setYear = useCalHeatmapStore((state) => state.setYear);

  const yearChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setYear(event.target.value);
  };

  return (
    <select
      className='bg-gray-200'
      defaultValue={currYear}
      onChange={yearChangeHandler}
    >
      <option value={'2024'}>2024년</option>
      <option value={'2025'}>2025년</option>
      <option value={'2026'}>2026년</option>
      <option value={'2027'}>2027년</option>
      <option value={'2028'}>2028년</option>
      <option value={'2029'}>2029년</option>
      <option value={'2030'}>2030년</option>
    </select>
  );
}
