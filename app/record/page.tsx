'use client';

import { useState, useRef, useEffect } from 'react';
import saveAs from 'file-saver';
import html2canvas from 'html2canvas';
import ImageCropper from './components/imageCropper';
import SubmitButtons from './components/submitButtons';
import InputButtons from './components/inputButtons';
import { HiddenImage } from './components/hiddenImage';
import SettingButtons from './components/settingButtons';
import useWeahter from '../hooks/useWeather';

export type Record = {
  km: string;
  hour: string;
  min: string;
  sec: string;
};

export default function Record() {
  // test

  const test = useWeahter();
  const [imageSrc, setImageSrc] = useState<string>('/test.png');
  const [croppedImageSrc, setCroppedImageSrc] = useState('/test.png');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [record, setRecord] = useState<Record>({
    km: '10',
    hour: '01',
    min: '00',
    sec: '00',
  });

  const ref = useRef<HTMLDivElement>(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const uploadImageLink = (link: string) => {
    setImageSrc(link);
  };

  const uploadCroppedImageLink = (link: string) => {
    setCroppedImageSrc(link);
  };

  const updateRecord = (record: Partial<Record>) => {
    setRecord((prev) => {
      return { ...prev, ...record };
    });
  };

  useEffect(() => {
    if (croppedImageSrc === '/test.png') return;
    const download = async () => {
      if (!ref.current) return;
      ref.current.style.display = 'block';
      const canvas = await html2canvas(ref.current);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'result.png');
        }
      });
      ref.current.style.display = 'none';
    };
    download();
  }, [croppedImageSrc]);

  return (
    <div className='relative w-full'>
      <h1 className='font-bold text-xl'>기록 인증 사진 만들기</h1>
      <p>기록을 입력하고 인증 사진을 만들 수 있습니다.</p>
      <p>업로드한 이미지는 확대, 축소, 이동이 가능합니다.</p>
      <ImageCropper
        src={imageSrc}
        onCropComplete={onCropComplete}
        record={record}
      />
      <InputButtons updateRecord={updateRecord} />
      <SettingButtons />
      <SubmitButtons
        imageSrc={imageSrc}
        uploadImageLink={uploadImageLink}
        uploadCroppedImageLink={uploadCroppedImageLink}
        croppedAreaPixels={croppedAreaPixels}
      />
      <HiddenImage
        croppedImageSrc={croppedImageSrc}
        record={record}
        ref={ref}
      />
    </div>
  );
}
