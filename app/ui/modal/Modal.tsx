'use client';

import { useShoeSelectModalStore } from '@/app/store/modalStore';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Modal({ title, description, children }: ModalProps) {
  return (
    <>
      <div className={styles['backdrop']} />
      <div className={styles['container']}>
        <div className={styles.container__title}>{title}</div>
        <div className={styles.container__desc}>{description}</div>
        {children}
      </div>
    </>
  );
}
