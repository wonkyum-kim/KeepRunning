'use client';

import { useCalHeatmapStore } from '@/app/store/calHeatmapStore';

export default function ShowResult() {
  const heats = useCalHeatmapStore((state) => state.heats);
  const year = useCalHeatmapStore((state) => state.year);

  const yearAcc = heats.reduce((acc, item) => {
    if (item.date.startsWith(year)) return acc + item.dist;
    return acc;
  }, 0);

  const yearPlay = heats.reduce((acc, item) => {
    if (item.date.startsWith(year)) return acc + 1;
    return acc;
  }, 0);

  const yearAvg = yearPlay === 0 ? 0 : (yearAcc / yearPlay).toFixed(2);
  return (
    <div className='w-full flex flex-col gap-4'>
      <h1 className='font-bold text-xl'>🏃 러닝 결산</h1>
      <p>
        {year}년 총 달린 거리: {yearAcc}km
      </p>
      <p>
        {year}년 평균 달린 거리: {yearAvg}km
      </p>
    </div>
  );
}
