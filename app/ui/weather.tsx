'use client';

import Image from 'next/image';
import useWeather from '../hooks/useWeather';
import { Droplet, Thermometer, Wind } from 'lucide-react';

export default function Weather() {
  const weather = useWeather();

  return (
    <div className='bg-blue-100 rounded-lg min-w-[180px] md:w-[350px] h-full flex items-center justify-center'>
      {weather && (
        <>
          <Image
            src={weather.icon}
            width={40}
            height={40}
            alt={weather.description}
            className='md:w-[100px] md:h-[100px]'
          />
          <div className='w-full h-full flex flex-col items-center justify-center md:gap-4'>
            <div className='w-full text-[0.5rem] md:text-lg flex items-center justify-around'>
              <div className='flex items-center'>
                <Thermometer color='red' fill='red' /> {weather.temp}°C
              </div>
              <div className='flex items-center'>
                <Wind color='blue' /> {weather.windSpeed}m/s
              </div>
              <div className='flex items-center'>
                <Droplet color='#93c5fd' fill='#93c5fd' /> {weather.rain ?? 0}mm
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
