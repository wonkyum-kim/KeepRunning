'use client';

import Image from 'next/image';
import { lato } from '../../fonts';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ShoesProps {
  name: string;
  maker: string;
  mileage: number;
  limit: number;
  image: string;
}

export default function Shoes({
  name,
  maker,
  mileage,
  image,
  limit,
}: ShoesProps) {
  const percentage = (mileage / limit) * 100;

  return (
    <div className='cursor-pointer rounded-lg font-black flex flex-col gap-4 items-center justify-center w-full lg:w-[500px] h-[600px] bg-sky-500 shadow-lg shadow-gray-400'>
      <div className='w-full h-[70px] p-4 text-white flex flex-col justify-start'>
        <div className='text-xl'>{maker}</div>
        <div>{name}</div>
      </div>
      <div className='w-full h-full bg-red-50 rounded-b-lg flex flex-col gap-4 items-center justify-center'>
        <div className='w-[250px] h-[250px] md:w-[350px] md:h-[350px]'>
          <CircularProgressbarWithChildren value={percentage} maxValue={500}>
            <Image
              alt={name}
              src={image}
              width={220}
              height={220}
              style={{
                objectFit: 'cover',
                borderRadius: '9999px',
              }}
              className='md:w-[300px] md:h-[300px]'
            />
          </CircularProgressbarWithChildren>
        </div>
        <div className={`${lato.className} antialiased text-5xl p-4 font-bold`}>
          {mileage} km
        </div>
      </div>
    </div>
  );
}
