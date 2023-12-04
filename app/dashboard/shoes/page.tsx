'use client';

import AddShoesDialog from '@/app/ui/dashboard/shoes/addShoesDialog';
import SelectShoes from '@/app/ui/dashboard/shoes/selectShoes';
import Shoes from '@/app/ui/dashboard/shoes/shoes';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function ShoesPage() {
  // get shoes
  const { data: shoes } = useQuery({
    queryKey: ['shoes'],
    queryFn: async () => {
      const response = await fetch('/api/getShoes', {
        next: { revalidate: 600 },
      });
      const data = await response.json();
      return data;
    },
  });

  const [selected, setSelected] = useState('');

  if (!shoes) {
    return null;
  }

  const currentShoes = shoes.filter((item: any) => {
    return item.name === selected;
  });

  // accTime
  function padTwoDigits(number: number) {
    return String(number).padStart(2, '0');
  }

  const totalTime = currentShoes[0]?.accTime;
  const totalMin = Math.floor(totalTime / 60);
  const sec = totalTime - totalMin * 60;
  const hour = Math.floor(totalMin / 60);
  const min = totalMin - hour * 60;
  const timeString = `
    ${padTwoDigits(hour)}:${padTwoDigits(min)}:${padTwoDigits(sec)}
  `;

  // mileage
  const totalDist = currentShoes[0]?.mileage;

  // progress
  const progress = ((totalDist / 500) * 100).toFixed(2);

  return (
    <div className='w-full p-5 flex flex-col gap-4'>
      <div className='w-full min-h-28 bg-sky-300 rounded-lg flex items-center p-5 gap-4'>
        <SelectShoes setSelected={setSelected} shoes={shoes} />
        <AddShoesDialog />
      </div>
      <div className='w-full h-full bg-gray-50 flex flex-col gap-6 items-center justify-center rounded-lg'>
        <Shoes {...currentShoes[0]} mileage={totalDist} />
        <div className='w-full flex items-center justify-center gap-8 text-xl'>
          <div className='flex flex-col text-center'>
            <div>{currentShoes[0] ? timeString : '00:00:00'}</div>
            <div className='text-md text-gray-500'>운동 시간</div>
          </div>
          <div className='flex flex-col text-center'>
            <div>{currentShoes[0]?.limit} km</div>
            <div className='text-md text-gray-500'>목표 거리</div>
          </div>
          <div className='flex flex-col text-center'>
            <div>{progress}%</div>
            <div className='text-md text-gray-500'>진행률</div>
          </div>
        </div>
      </div>
    </div>
  );
}
