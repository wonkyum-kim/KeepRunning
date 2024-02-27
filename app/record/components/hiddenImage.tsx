import Image from 'next/image';
import { ForwardedRef, RefObject, forwardRef } from 'react';
import type { Record } from '../page';
import RecordText from './recordText';

interface HiddenImageProps {
  croppedImageSrc: string;
  record: Record;
}

export const HiddenImage = forwardRef(function HiddenImage(
  { croppedImageSrc, record }: HiddenImageProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className='w-[320px] h-[320px] absolute top-[92px] left-1/2 translate-x-[-50%] hidden z-[-1]'
      ref={ref}
    >
      <Image src={croppedImageSrc} width={320} height={320} alt='test' />
      <RecordText record={record} />
    </div>
  );
});
