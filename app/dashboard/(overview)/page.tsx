import LogOut from '@/app/ui/dashboard/logOut';
import Link from 'next/link';
import Weather from '@/app/ui/dashboard/overview/weather';
import ContestCalender from '@/app/ui/dashboard/overview/contestCalender';
import Activity from '@/app/ui/dashboard/overview/activity';
import getSession from '@/app/actions/getSession';
import getCurrentUser from '@/app/actions/getCurrentUser';
import Image from 'next/image';
import { getActivities } from '@/app/actions/getActivities';
import RunningRecord from '@/app/ui/dashboard/overview/runningRecord';
import Shoes from '@/app/ui/dashboard/overview/shoes';

// 날씨, 신발, 활동, 다가오는 대회...
export default async function Page() {
  // const session = await getSession();
  // const currentUser = await getCurrentUser();
  // const activities = await getActivities();

  // const multiPolyline = session
  //   ? activities.map((act: any) => {
  //       return act.decoded;
  //     })
  //   : null;

  // {session ? <LogOut /> : <Link href='/dashboard/signIn'>로그인</Link>}
  // <Image
  //   alt='avatar'
  //   src={currentUser?.image || '/placeholder.jpg'}
  //   width={20}
  //   height={20}
  // />
  // <Weather />
  // <ContestList />
  // <Activity multiPolyline={multiPolyline} />

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
