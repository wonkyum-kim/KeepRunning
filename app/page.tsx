import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SelectYear from './ui/main/selectYear';
import AddHeat from './ui/main/addHeat';
import ShowResult from './ui/main/showResult';
import ShowStreak from './ui/main/showStreak';

const CalHeat = dynamic(() => import('./ui/main/calHeat'), {
  ssr: false,
  loading: () => <Skeleton className='w-full h-[150px]' />,
});

export default function Home() {
  return (
    <main className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-4'>
        <h1 className='font-bold text-xl'>✔️ 러닝 히트맵</h1>
        <p className='flex items-center justify-between'>
          달리기를 하고 히트맵을 채워보세요
          <SelectYear />
        </p>
        <CalHeat />
        <AddHeat />
        <ShowStreak />
      </div>
      <hr />
      <ShowResult />
    </main>
  );
}
