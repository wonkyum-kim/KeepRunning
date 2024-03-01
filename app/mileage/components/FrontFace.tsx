'use client';

import Image from 'next/image';
import styles from './shoesCard.module.css';
import { deleteDataToIndexedDB, getAllDataFromIndexedDB } from '@/app/libs/idb';
import { Shoes, useMileageStore } from '@/app/store/mileageStore';

export default function FrontFace() {
  const selectedShoes = useMileageStore((state) => state.selectedShoes);
  const setSelectedShoes = useMileageStore((state) => state.setSelectedShoes);
  const setAllShoes = useMileageStore((state) => state.setAllShoes);

  const deleteHandler = async () => {
    const real = confirm('정말 삭제하시겠습니까?');
    if (!real) return;
    const success = await deleteDataToIndexedDB(id);
    const result = await getAllDataFromIndexedDB<Shoes>();
    if (success) {
      setAllShoes(result);
      setSelectedShoes(result.length === 0 ? null : result[0]);
    }
  };

  if (!selectedShoes) return;

  const { maker, name, imageSrc, acc, goal, id } = selectedShoes;

  return (
    <div className={styles.card__face}>
      <div className='bg-sky-500 w-full py-2 px-4 flex flex-col relative rounded-lg'>
        <div className='w-full text-left text-2xl'>{maker}</div>
        <div className='w-full text-left'>{name}</div>
        <button
          id='edit'
          onClick={deleteHandler}
          className='hover:bg-sky-200 text-xl absolute bg-sky-100 w-10 h-10 rounded-lg right-4 top-1/2 translate-y-[-50%] z-10'
        >
          ❌
        </button>
      </div>
      <figure className={styles.photo}>
        {imageSrc !== 'null' && (
          <>
            <Image
              src={imageSrc}
              alt={name}
              width={300}
              height={300}
              className='w-[70%] aspect-square object-contain'
            />
            <figcaption className='min-[425px]:text-xl w-full md:w-[70%] text-black flex justify-around'>
              <div className='flex flex-col'>
                <p>{acc}km</p>
                <p>누적 거리</p>
              </div>
              <div className='flex flex-col'>
                <p>{goal}km</p>
                <p>목표 거리</p>
              </div>
              <div className='flex flex-col'>
                <p>{((acc / goal) * 100).toFixed(1)}%</p>
                <p>진행률</p>
              </div>
            </figcaption>
          </>
        )}
      </figure>
    </div>
  );
}
