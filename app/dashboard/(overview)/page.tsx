import Weather from '@/app/ui/dashboard/overview/weather';
import ContestCalender from '@/app/ui/dashboard/overview/contestCalender';
import RunningRecord from '@/app/ui/dashboard/overview/runningRecord';
import Shoes from '@/app/ui/dashboard/overview/shoes';

// 날씨, 신발, 활동, 다가오는 대회...
export default async function Page() {
  return (
    <div className='w-full h-full p-5 pb-0 flex flex-col gap-8'>
      <div className='w-full xl:max-w-[60%] min-h-full flex flex-col lg:flex-row gap-8'>
        <Weather />
        <ContestCalender />
      </div>
      <div className='w-full xl:max-w-[60%] min-h-full flex flex-col lg:flex-row gap-8'>
        <RunningRecord />
        <Shoes />
      </div>
    </div>
  );
}
