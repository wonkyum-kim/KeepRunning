'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { addDataToIndexedDB, getAllDataFromIndexedDB } from '@/app/libs/idb';
import { useShoesModalStore } from '@/app/store/shoesModalStore';
import { shoesList } from '@/app/store/shoesList';
import { Shoes, useMileageStore } from '@/app/store/mileageStore';

const STORE_NAME = 'mileage';

export default function AddForm() {
  const onClose = useShoesModalStore((state) => state.onClose);
  const setAllShoes = useMileageStore((state) => state.setAllShoes);
  const setSelectedShoes = useMileageStore((state) => state.setSelectedShoes);
  const [maker, setMaker] = useState('푸마');
  const [error, setError] = useState(false);

  const addShoe = async (formData: FormData) => {
    const maker = formData.get('maker') as string;
    const index = +(formData.get('shoe') as string);
    if (index === -1) {
      setError(true);
      return;
    }
    const acc = +(formData.get('prev') as string);
    const goal = +(formData.get('goal') as string);
    const [name, imageSrc] = shoesList[maker][index];
    const now = new Date();

    const newShoes = {
      id: `${maker}_${name}_${now.toString()}`,
      maker,
      name,
      acc,
      goal,
      imageSrc,
      created: now,
    };

    // idb에 저장
    await addDataToIndexedDB(STORE_NAME, newShoes);
    // idb에서 불러옴
    const result = await getAllDataFromIndexedDB<Shoes>(STORE_NAME);
    // 재렌더링
    setSelectedShoes(newShoes);
    setAllShoes(result);
    onClose();
  };

  return (
    <form className='flex flex-col gap-4' action={addShoe}>
      <div className='flex gap-4 w-full'>
        <label htmlFor='maker' className='min-w-[150px]'>
          제조사
        </label>
        <select
          id='maker'
          name='maker'
          className='w-full'
          onChange={(event) => {
            setMaker(event.target.value);
          }}
        >
          <option value='푸마'>푸마</option>
          <option value='나이키'>나이키</option>
        </select>
      </div>
      <div className='flex gap-4 w-full'>
        <label htmlFor='shoe' className='min-w-[150px]'>
          신발
        </label>
        <select
          id='shoe'
          name='shoe'
          className={clsx(
            'w-full',
            error && 'border-red-500 border-2 rounded-lg'
          )}
          onChange={() => {
            setError(false);
          }}
        >
          <option value='-1'>선택</option>
          {shoesList[maker].map((item: string[], index) => {
            return (
              <option key={item[0]} value={index}>
                {item[0]}
              </option>
            );
          })}
        </select>
      </div>
      <div className='flex gap-4 w-full relative'>
        <label htmlFor='prev' className='min-w-[150px]'>
          기존 누적 마일리지
        </label>
        <input
          id='prev'
          name='prev'
          type='number'
          step='0.01'
          className='w-full px-2'
          defaultValue={0}
          required
        />
        <div className='right-2 absolute'>km</div>
      </div>
      <div className='flex gap-4 w-full relative'>
        <label htmlFor='goal' className='min-w-[150px]'>
          목표 누적 마일리지
        </label>
        <input
          id='goal'
          name='goal'
          type='number'
          className='w-full px-2'
          defaultValue={500}
          required
        />
        <div className='right-2 absolute'>km</div>
      </div>
      <div className='w-full flex items-center justify-end gap-[12px]'>
        <button type='submit' className='bg-blue-300 py-2 px-4 rounded-lg'>
          추가
        </button>
        <button className='bg-red-300 py-2 px-4 rounded-lg' onClick={onClose}>
          취소
        </button>
      </div>
    </form>
  );
}
