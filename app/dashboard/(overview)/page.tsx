import LogOut from '@/app/ui/dashboard/logOut';
import Link from 'next/link';
import Weather from '@/app/ui/dashboard/overview/weather';
import ContestList from '@/app/ui/dashboard/overview/contestList';
import Activity from '@/app/ui/dashboard/overview/activity';
import getSession from '@/app/actions/getSession';
import getCurrentUser from '@/app/actions/getCurrentUser';
import Image from 'next/image';
import { getActivities } from '@/app/actions/getActivities';

// 날씨, 신발, 활동, 다가오는 대회...
export default async function Page() {
  const session = await getSession();
  const currentUser = await getCurrentUser();
  const activities = await getActivities();

  console.log(activities);

  return (
    <div className='w-full min-h-full p-5 flex flex-col gap-4'>
      <div className='w-full h-[200px] flex items-center bg-gray-50'>
        {session ? <LogOut /> : <Link href='/dashboard/signIn'>로그인</Link>}
        <Image
          alt='avatar'
          src={currentUser?.image || '/placeholder.jpg'}
          width={20}
          height={20}
        />
      </div>
      <div className='w-full h-full bg-gray-50 rounded-lg flex flex-col p-8 gap-4 flex-wrap'>
        <Weather />
        <ContestList />
        <Activity />
      </div>
    </div>
  );
}
