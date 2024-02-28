'use client';

import { useShoeSelectModalStore } from '@/app/store/modalStore';
import { ShoesProps } from '../page';
import { useShoesStore } from '@/app/store/shoesStore';
import { ChangeEventHandler } from 'react';

interface DashboardProps {
  allShoes: ShoesProps[];
}

export default function Dashboard({ allShoes }: DashboardProps) {
  const onOpen = useShoeSelectModalStore((state) => state.onOpen);
  const setSelected = useShoesStore((state) => state.setSelected);

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className='bg-sky-300 w-full h-20 rounded-lg flex p-4 gap-4'>
      <select className='w-full rounded-lg' onChange={changeHandler}>
        {allShoes.length === 0 && (
          <option value='null'>신발이 없습니다.</option>
        )}
        {allShoes.length &&
          allShoes.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </select>
      <button
        onClick={onOpen}
        className='flex items-center justify-center bg-indigo-400 text-white rounded-lg p-4 w-[150px] select-none'
      >
        신발추가
      </button>
    </div>
  );
}
