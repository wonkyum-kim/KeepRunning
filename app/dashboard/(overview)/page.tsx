import Image from 'next/image';
import dynamic from 'next/dynamic';

import Weather from '@/app/ui/dashboard/overview/weather';
import Summary from '@/app/ui/dashboard/overview/summary';
import { getStrava } from '@/app/actions/getStrava';
import { Skeleton } from '@/components/ui/skeleton';
import { pace } from '@/app/libs';

const Map = dynamic(() => import('@/app/ui/dashboard/overview/map'), {
  ssr: false,
  loading: () => <Skeleton className='w-full h-full' />,
});

export default async function Page() {
  const strava = await getStrava();
  const lastRun = strava[0];
  const distance = (lastRun.distance / 1000).toFixed(2);

  // TODO: import run time
  const runTime = Math.floor(lastRun.moving_time / 60);
  const hour = Math.floor(runTime / 60);
  const min = runTime % 60;

  // pace
  const [paceMin, paceSec] = pace(lastRun.moving_time, lastRun.distance);

  return (
    <div className='md:w-full min-h-full flex flex-col xl:flex-row gap-4 bg-[#f9f8f5] p-10 md:m-0 m-4 rounded-lg'>
      <div className='w-full xl:w-[40%] h-full xl:h-full flex flex-col gap-4'>
        <Summary />
        <Weather />
      </div>
      <div className='w-full xl:h-full h-[900px] bg-white rounded-lg shadow-lg shadow-gray-400'>
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
