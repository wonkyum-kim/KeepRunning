'use client';

import { ChangeEventHandler } from 'react';
import { useShoesModalStore } from '@/app/store/shoesModalStore';
import { useMileageStore } from '@/app/store/mileageStore';

export default function Dashboard() {
  const onOpen = useShoesModalStore((state) => state.onOpen);
  const allShoes = useMileageStore((state) => state.allShoes);
  const setSelectedShoes = useMileageStore((state) => state.setSelectedShoes);
  const selectedShoes = useMileageStore((state) => state.selectedShoes);

  // 선택한 신발을 저장
  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const id = event.target.value;
    setSelectedShoes(allShoes.find((item) => item.id === id) ?? null);
  };

  return (
    <div className='bg-sky-300 w-full h-20 rounded-lg flex p-4 gap-4'>
      <select
        className='w-full rounded-lg'
        onChange={changeHandler}
        value={selectedShoes?.id}
      >
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
