import { getStrava } from '@/app/actions/getStrava';
import { rowdies } from '@/app/ui/fonts';
import { convertToDateString } from '@/app/libs';

export default async function Summary() {
  const strava = await getStrava();

  const totalDistance = strava.reduce((acc: number, act: any) => {
    return acc + act.distance;
  }, 0);

  // TODO
  const totalTime = Math.floor(
    strava.reduce((acc: number, act: any) => {
      return acc + act.moving_time;
    }, 0) / 60
  );
  const totalHour = Math.floor(totalTime / 60);
  const totalMin = totalTime % 60;

  const totalActivities = strava.length;

  const lastRunDateString = convertToDateString(
    new Date(strava[0].start_date_local)
  );

  return (
    <div className='rounded-lg font-black flex flex-col gap-8 items-center justify-center flex-1 p-5 bg-white shadow-lg shadow-gray-400'>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-gray-500'>최근 활동</div>
        <div>
          {strava[0].name} * {lastRunDateString}
        </div>
      </div>
      <div className='grid grid-cols-none grid-rows-3 sm:grid-rows-none sm:grid-cols-3 w-full min-h-32 p-4 gap-8 border-2'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='text-gray-500'>나의 활동</div>
          <div className={`${rowdies.className} antialiased text-xl`}>
            총 {totalActivities}건
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='text-gray-500'>누적 거리</div>
          <div className={`${rowdies.className} antialiased text-xl`}>
            {(totalDistance / 1000).toFixed(2)} km
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='text-gray-500'>누적 시간</div>
          <div className={`${rowdies.className} antialiased text-xl`}>
            {totalHour}h {totalMin}m
          </div>
        </div>
      </div>
    </div>
  );
}
