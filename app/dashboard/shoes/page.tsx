'use client';

import AddShoesDialog from '@/app/ui/dashboard/shoes/addShoesDialog';
import SelectShoes from '@/app/ui/dashboard/shoes/selectShoes';
import Shoes from '@/app/ui/dashboard/shoes/shoes';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// const activities = (await getActivities()).map((record: any) => {
//   return {
//     time: record.moving_time,
//     distance: record.distance / 1000,
//     date: record.start_date_local,
//   };
// });

export default function ShoesPage() {
  // get shoes...
  const { data: shoes } = useQuery({
    queryKey: ['shoes'],
    queryFn: async () => {
      const response = await fetch('/api/getShoes');
      const data = await response.json();
      return data;
    },
  });

  const [selected, setSelected] = useState(shoes[1].name);

  const currentShoes = shoes.filter((item: any) => {
    return item.name === selected;
  });

  return (
    <div className='w-full p-5 flex flex-col gap-4'>
      <div className='w-full min-h-28 bg-sky-300 rounded-lg flex items-center p-5 gap-4'>
        <SelectShoes setSelected={setSelected} shoes={shoes} />
        <AddShoesDialog />
      </div>
      <div className='w-full h-full bg-gray-50 flex flex-col gap-6 items-center justify-center rounded-lg'>
        <Shoes {...currentShoes[0]} mileage={0} />
        <div className='w-full flex items-center justify-center gap-8 text-xl'>
          <div className='flex flex-col text-center'>
            <div>0:00:00</div>
            <div className='text-md text-gray-500'>운동 시간</div>
          </div>
          <div className='flex flex-col text-center'>
            <div>{0} km</div>
            <div className='text-md text-gray-500'>목표 거리</div>
          </div>
          <div className='flex flex-col text-center'>
            <div>3.5%</div>
            <div className='text-md text-gray-500'>진행률</div>
          </div>
        </div>
      </div>
    </div>
  );
}
