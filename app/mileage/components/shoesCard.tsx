'use client';

import clsx from 'clsx';
import { MouseEventHandler, useState } from 'react';
import { useMileageStore } from '@/app/store/mileageStore';
import styles from './shoesCard.module.css';
import FrontFace from './FrontFace';
import BackFace from './BackFace';

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

export default function ShoesCard() {
  const [isFront, setIsFront] = useState(true);
  const selectedShoes = useMileageStore((state) => state.selectedShoes);

  if (!selectedShoes) {
    return <div className='w-full text-end px-4'>신발을 추가해주세요 ⬆️</div>;
  }

  const handleFlip: MouseEventHandler = (event) => {
    if ((event.target as HTMLElement).id.includes('edit')) return;
    setIsFront((prev) => !prev);
  };

  return (
    <div className={styles.background}>
      <div className={styles.scene}>
        <Card handleFlip={handleFlip} isFront={isFront}>
          <FrontFace />
          <BackFace />
        </Card>
      </div>
    </div>
  );
}
