'use client';

import type { ShoesProps } from '../page';
import { MouseEventHandler, useState } from 'react';
import styles from './shoesCard.module.css';
import clsx from 'clsx';
import Image from 'next/image';

interface ShoesCardProps {
  shoes: ShoesProps;
}

function Card({
  children,
  handleFlip,
  isFront,
}: {
  children: React.ReactNode;
  handleFlip: MouseEventHandler<HTMLDivElement>;
  isFront: boolean;
}) {
  return (
    <div
      onClick={handleFlip}
      className={clsx(styles.card, !isFront && styles['is-flipped'])}
    >
      {children}
    </div>
  );
}

function CardFace({ side }: { side: string }) {
  return (
    <div
      className={clsx(
        styles.card__face,
        side === 'front' && styles['card__face--front'],
        side === 'back' && styles['card__face--back']
      )}
    >
      {side}
    </div>
  );
}

function FrontFace({
  maker,
  name,
  imageSrc,
  acc,
  goal,
}: Pick<ShoesProps, 'maker' | 'name' | 'imageSrc' | 'acc' | 'goal'>) {
  const editHandler = () => {
    // TODO
  };
  return (
    <div className={styles.card__face}>
      <div className='bg-sky-500 w-full py-2 px-4 flex flex-col relative'>
        <div className='w-full text-left text-2xl'>{maker}</div>
        <div className='w-full text-left'>{name}</div>
        <button
          id='edit'
          onClick={editHandler}
          className='hover:bg-sky-200 text-xl absolute bg-sky-100 w-10 h-10 rounded-lg right-4 top-1/2 translate-y-[-50%] z-10'
        >
          ✏️
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
            <figcaption className='text-xl w-full md:w-[70%] text-black flex justify-around'>
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

export default function ShoesCard({ shoes }: ShoesCardProps) {
  const [isFront, setIsFront] = useState(true);

  const handleFlip: MouseEventHandler = (event) => {
    if ((event.target as HTMLElement).id === 'edit') return;
    setIsFront((prev) => !prev);
  };

  const { maker, name, imageSrc, acc, goal } = shoes;

  return (
    <div className={styles.background}>
      <div className={styles.scene}>
        <Card handleFlip={handleFlip} isFront={isFront}>
          <FrontFace
            maker={maker}
            name={name}
            imageSrc={imageSrc}
            acc={acc}
            goal={goal}
          />
          <CardFace side='back' />
        </Card>
      </div>
    </div>
  );
}
