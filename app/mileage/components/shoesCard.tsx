'use client';

import type { ShoesProps } from '../page';
import { MouseEventHandler, useState } from 'react';
import styles from './shoesCard.module.css';
import clsx from 'clsx';
import FrontFace from './FrontFace';
import BackFace from './BackFace';

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

export default function ShoesCard({ shoes }: ShoesCardProps) {
  const [isFront, setIsFront] = useState(true);

  const handleFlip: MouseEventHandler = (event) => {
    if ((event.target as HTMLElement).id.includes('edit')) return;
    setIsFront((prev) => !prev);
  };

  const { maker, name, imageSrc, acc, goal, id } = shoes;

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
          <BackFace acc={acc} goal={goal} id={id} />
        </Card>
      </div>
    </div>
  );
}
