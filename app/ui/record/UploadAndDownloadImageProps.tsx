'use client';

import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

// https://yong-nyong.tistory.com/53

interface UploadAndDownloadImageProps {
  changeSrc: (input: string) => void;
  refObj: RefObject<HTMLDivElement>;
}

export default function UploadAndDownloadImage({
  changeSrc,
  refObj,
}: UploadAndDownloadImageProps) {
  const handleUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // 파일리더 객체 생성
      const reader = new FileReader();
      // 파일 읽어온 후 실행되는 콜백함수
      reader.onload = (e) => {
        changeSrc(e.target!.result as string);
      };
      // 파일 객체를 읽어 base64 형태의 문자열로 변환
      reader.readAsDataURL(file);
    }
  };

  const handleDownload: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!refObj.current) return;
    try {
      const canvas = await html2canvas(document.body);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'result.png');
        }
      });
    } catch {
      console.log('error');
    }
  };

  return (
    <form className='flex gap-2'>
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
