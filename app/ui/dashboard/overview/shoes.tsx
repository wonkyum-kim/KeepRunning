'use client';

import Image from 'next/image';
import { rowdies } from '../../fonts';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/navigation';

export default function Shoes() {
  const percentage = 9.45;

  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push('/dashboard/shoes');
      }}
      className='cursor-pointer rounded-lg font-black flex flex-col gap-4 items-center justify-center w-full lg:w-[450px] h-[450px] bg-sky-500 shadow-lg shadow-gray-400'
    >
      <div className='w-full h-[70px] p-4 text-white flex flex-col justify-start'>
        <div className='text-xl'>Puma</div>
        <div>Velocity Nitro 2</div>
      </div>
      <div className='w-full h-full bg-red-50 rounded-b-lg'>
        <div className={`${rowdies.className} antialiased text-5xl p-4`}>
          9.45km
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-[230px] h-[230px]'>
            <CircularProgressbarWithChildren value={percentage} maxValue={500}>
              <Image
                alt='velocity nitro 2'
                src='/Velocity-Nitro-2-FM.avif'
                width={200}
                height={200}
                style={{
                  objectFit: 'cover',
                  borderRadius: '9999px',
                }}
              />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </div>
  );
}
