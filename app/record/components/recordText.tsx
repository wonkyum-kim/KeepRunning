'use client';

import type { Record } from '../page';
import calcPace from '@/app/libs/calcPace';
import { useRecordStore } from '@/app/store/recordStore';
import clsx from 'clsx';

function TextComponent({ val1, val2 }: { val1: string; val2: string }) {
  const isCol = useRecordStore((state) => state.isCol);
  return (
    <div className={clsx('flex flex-col gap-[1px]', !isCol && 'text-center')}>
      <p className='text-[15px] font-semibold'>{val1}</p>
      <p className='pr-[2px] text-[24px] font-semibold'>{val2}</p>
    </div>
  );
}

export default function RecordText({ record }: { record: Record }) {
  const [minPace, secPace] = calcPace(record);
  const isBlack = useRecordStore((state) => state.isBlack);
  const isBottom = useRecordStore((state) => state.isBottom);
  const isRight = useRecordStore((state) => state.isRight);
  const isCol = useRecordStore((state) => state.isCol);
  return (
    <div
      className={clsx(
        'absolute flex select-none leading-none italic gap-4 justify-center',
        !isBlack && 'text-white',
        isBottom && 'bottom-4',
        !isBottom && 'top-4',
        isRight && isCol && 'right-4 text-right',
        !isRight && isCol && 'left-4',
        isCol && 'flex-col',
        !isCol && 'w-full'
      )}
    >
      <TextComponent val1={'거리'} val2={`${record.km}km`} />
      <TextComponent
        val1={'시간'}
        val2={`${record.hour}:${record.min}:${record.sec}`}
      />
      <TextComponent val1={'페이스'} val2={`${minPace}'${secPace}''`} />
    </div>
  );
}
