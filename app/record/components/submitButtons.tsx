'use client';

import { ChangeEventHandler, MouseEventHandler } from 'react';
import getCroppedImg from '../cropImage';

interface SubmitButtonsProps {
  imageSrc: string;
  croppedAreaPixels: any;
  uploadImageLink: (link: string) => void;
  uploadCroppedImageLink: (link: string) => void;
}

export default function SubmitButtons({
  imageSrc,
  uploadImageLink,
  uploadCroppedImageLink,
  croppedAreaPixels,
}: SubmitButtonsProps) {
  const handleUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // 파일리더 객체 생성
      const reader = new FileReader();
      // 파일 읽어온 후 실행되는 콜백함수
      reader.onload = (e) => {
        uploadImageLink(e.target!.result as string);
      };
      // 파일 객체를 읽어 base64 형태의 문자열로 변환
      reader.readAsDataURL(file);
    }
  };

  const handleDownload: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      uploadCroppedImageLink(croppedImage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='flex gap-4 w-full place-content-end pb-4'>
      <label
        htmlFor='upload'
        className='bg-blue-500 text-white px-4 py-2 rounded-lg font-bold'
      >
        사진 업로드
      </label>
      <input
        type='file'
        onChange={handleUpload}
        id='upload'
        className='hidden'
        accept='image/*'
      />
      <button
        id='download'
        className='bg-blue-500 text-white px-4 py-2 rounded-lg font-bold'
        onClick={handleDownload}
      >
        사진 다운로드
      </button>
    </form>
  );
}
