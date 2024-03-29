'use client';

import clsx from 'clsx';
import styles from './shoesCard.module.css';
import { editDataFromIndexedDB } from '@/app/libs/idb';
import { Shoes, useMileageStore } from '@/app/store/mileageStore';
import { useState } from 'react';

const STORE_NAME = 'mileage';

export default function BackFace() {
  // store
  const selectedShoes = useMileageStore((state) => state.selectedShoes);
  const setSelectedShoes = useMileageStore((state) => state.setSelectedShoes);

  if (!selectedShoes) return;
  const { acc, goal, id } = selectedShoes;

  const editPrev = async (formData: FormData) => {
    const newAcc = +(formData.get('edit-acc') as string);
    const newGoal = +(formData.get('edit-goal') as string);
    const success = await editDataFromIndexedDB<Shoes>(
      STORE_NAME,
      { acc: newAcc, goal: newGoal, id },
      id
    );
    if (success) {
      setSelectedShoes({ ...selectedShoes, acc: newAcc, goal: newGoal });
    }
  };

  const editNow = async (formData: FormData) => {
    const addedMileage = +(formData.get('edit-add') as string);
    const newAcc = selectedShoes.acc + addedMileage;
    const success = await editDataFromIndexedDB<Shoes>(
      STORE_NAME,
      {
        acc: newAcc,
        id,
      },
      id
    );
    if (success) {
      setSelectedShoes({ ...selectedShoes, acc: newAcc });
    }
  };

  return (
    <div className={clsx(styles.card__face, styles['card__face--back'])}>
      <form
        className='text-black text-left flex flex-col gap-4'
        id='edit-prev'
        action={editPrev}
      >
        <h1 className='text-xl'>✏️ 기존 기록 수정</h1>
        <div className='w-full flex justify-between relative'>
          <label htmlFor='edit-acc' className='min-w-[30%]'>
            현재 누적 마일리지
          </label>
          <input
            id='edit-acc'
            name='edit-acc'
            type='number'
            step='0.01'
            className='border-2 max-w-[50%] border-blue-300  focus:outline-blue-500 rounded-lg pl-4'
            defaultValue={acc}
            key={`${id}${acc}${goal}`}
            required
          />
          <div className='right-2 absolute text-blue-500 top-1/2 translate-y-[-50%]'>
            km
          </div>
        </div>
        <div className='w-full flex justify-between relative'>
          <label htmlFor='edit-acc' className='min-w-[30%]'>
            목표 누적 마일리지
          </label>
          <input
            id='edit-goal'
            name='edit-goal'
            type='number'
            step='0.01'
            className='border-2 max-w-[50%] border-blue-300 focus:outline-blue-500 rounded-lg pl-4'
            defaultValue={goal}
            key={`${id}${acc}${goal}`}
          />
          <div className='right-2 absolute text-blue-500 top-1/2 translate-y-[-50%]'>
            km
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-400 w-[100px] text-white rounded-lg place-self-end'
          id='edit-submit-prev'
        >
          수정
        </button>
      </form>
      <form
        className='text-black text-left flex flex-col gap-4'
        id='edit-now'
        action={editNow}
      >
        <h1 className='text-xl'>✏️ 새로운 기록 추가</h1>
        <div className='w-full flex justify-between relative'>
          <label htmlFor='edit-acc' className='min-w-[30%]'>
            마일리지 추가
          </label>
          <input
            id='edit-add'
            name='edit-add'
            type='number'
            step='0.01'
            className='border-2 max-w-[50%] border-blue-300  focus:outline-blue-500 rounded-lg pl-4'
            defaultValue={0}
            key={`${id}${acc}${goal}`}
            required
          />
          <div className='right-2 absolute text-blue-500 top-1/2 translate-y-[-50%]'>
            km
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-400 w-[100px] text-white rounded-lg place-self-end'
          id='edit-submit-new'
        >
          추가
        </button>
      </form>
    </div>
  );
}
