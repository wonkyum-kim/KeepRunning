import Image from 'next/image';

import Weather from '@/app/ui/dashboard/overview/weather';
import Summary from '@/app/ui/dashboard/overview/summary';
import Map from '@/app/ui/dashboard/overview/map';
import { getStrava } from '@/app/actions/getStrava';

export default async function Page() {
  const strava = await getStrava();
  const lastRun = strava[0];
  const distance = (lastRun.distance / 1000).toFixed(2);

  // run time
  const runTime = Math.floor(lastRun.moving_time / 60);
  const hour = Math.floor(runTime / 60);
  const min = runTime % 60;

  // pace
  const paceS_KM = lastRun.moving_time / (lastRun.distance / 1000);
  const paceMin = Math.floor(paceS_KM / 60);
  const temp = Math.floor(paceS_KM - paceMin * 60);
  const paceSec = temp < 10 ? '0' + temp.toString() : temp.toString();

  return (
    <div className='w-full min-h-full flex flex-col xl:flex-row gap-4 bg-[#f9f8f5] p-10'>
      <div className='w-full xl:w-[40%] h-full xl:h-full flex flex-col gap-4'>
        <Summary />
        <Weather />
      </div>
      <div className='w-full xl:h-full h-[900px] bg-white rounded-lg'>
        <div className='w-full h-[25%] sm:h-[30%] flex flex-col items-center justify-center px-8 gap-4'>
          <div className='flex w-full gap-8 items-center'>
            <Image
              src='/shoe-icon.svg'
              width={64}
              height={64}
              alt='shoe'
              className='w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16'
            />
            <div className='md:text-2xl xl:text-3xl font-black'>
              {lastRun.name}
            </div>
          </div>
          <div className='grid grid-cols-3 w-full sm:h-20 sm:px-8'>
            <div className='flex flex-col w-full h-full sm:border-r-2 sm:p-4 gap-4 items-center justify-center'>
              <div className='text-gray-500 hidden sm:block'>Distance</div>
              <div className='sm:text-2xl'>{distance} km</div>
            </div>
            <div className='flex flex-col w-full h-full sm:border-r-2 sm:p-4 gap-4 items-center justify-center'>
              <div className='text-gray-500 hidden sm:block'>Pace</div>
              <div className='sm:text-2xl'>
                {paceMin}:{paceSec} / km
              </div>
            </div>
            <div className='flex flex-col w-full h-full sm:p-4 gap-4 items-center justify-center'>
              <div className='text-gray-500 hidden sm:block'>Time</div>
              <div className='sm:text-2xl'>
                {hour}h {min}m
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[70%] p-4'>
          <Map multiPolyline={strava[0].decoded} />
        </div>
      </div>
    </div>
  );
}
