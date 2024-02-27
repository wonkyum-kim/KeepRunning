'use client';

import type { Record } from '../page';

import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import RecordText from './recordText';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageCropperProps {
  src: string;
  record: Record;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
}

export default function ImageCropper({
  src,
  onCropComplete,
  record,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <div className='w-full flex place-content-center py-4'>
      <div className='w-[320px] h-[320px] relative'>
        {start && (
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            cropSize={{ width: 320, height: 320 }}
            aspect={1}
            onCropComplete={onCropComplete}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            objectFit='cover'
          />
        )}
        {!start && <Skeleton className='w-full h-full' />}
        <RecordText record={record} />
      </div>
    </div>
  );
}
