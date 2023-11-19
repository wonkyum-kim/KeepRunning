import { getActivities } from '@/app/actions/getActivities';
import { rowdies } from '../../fonts';

export default async function RunningRecord() {
  const activities = await getActivities();

  const totalDistance = activities.reduce((acc: number, act: any) => {
    return acc + act.distance;
  }, 0);

  return (
    <div className='rounded-lg font-black text-3xl flex flex-col gap-8 items-center justify-center w-full lg:w-[450px] h-[400px] bg-sky-400 shadow-lg shadow-gray-400'>
      <div>총 달린 거리</div>
      <div className={`${rowdies.className} antialiased text-5xl `}>
        {(totalDistance / 1000).toFixed(2)} km
      </div>
    </div>
  );
}
