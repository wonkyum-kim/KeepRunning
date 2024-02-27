'use client';

import { useRecordStore } from '@/app/store/recordStore';
import clsx from 'clsx';

export default function SettingButtons() {
  const toggleColor = useRecordStore((state) => state.toggleColor);
  const toggleVertical = useRecordStore((state) => state.toggleVertical);
  const toggleHorizontal = useRecordStore((state) => state.toggleHorizontal);
  const toggleDirection = useRecordStore((state) => state.toggleDirection);
  const isBlack = useRecordStore((state) => state.isBlack);
  const isBottom = useRecordStore((state) => state.isBottom);
  const isRight = useRecordStore((state) => state.isRight);
  const isCol = useRecordStore((state) => state.isCol);
  return (
    <div className='grid grid-cols-4 w-full gap-4 pb-4'>
      <button
        onClick={toggleColor}
        className='border-blue-500 focus:border-[2px] rounded-md border-[1px] py-2'
      >
        {isBlack ? '검은색' : '흰색'}
      </button>
      <button
        onClick={toggleVertical}
        className='border-blue-500 focus:border-[2px] rounded-md border-[1px] py-2'
      >
        {isBottom ? '아래' : '위'}
      </button>
      <button
        onClick={toggleHorizontal}
        className={clsx(
          'border-blue-500 focus:border-[2px] rounded-md border-[1px] py-2',
          !isCol && 'cursor-not-allowed touch-none'
        )}
      >
        {isCol ? (isRight ? '오른쪽' : '왼쪽') : '-'}
      </button>
      <button
        onClick={toggleDirection}
        className='border-blue-500 focus:border-[2px] rounded-md border-[1px] py-2'
      >
        {isCol ? '세로' : '가로'}
      </button>
    </div>
  );
}
