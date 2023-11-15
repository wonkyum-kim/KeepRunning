import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import LogOut from '@/app/ui/dashboard/logOut';
import Link from 'next/link';
import Weather from '@/app/ui/dashboard/overview/weather';

// 날씨, 신발, 활동, 다가오는 대회...
export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className='w-full h-full p-5 flex flex-col gap-4'>
      {session ? <LogOut /> : <Link href='/dashboard/signIn'>로그인</Link>}
      <div className='w-full h-full bg-gray-50 rounded-lg flex flex-col lg:flex-row p-8 gap-4'>
        <Weather />
        <div className='min-w-[50%] max-h-[50%] bg-blue-400'>날씨</div>
      </div>
    </div>
  );
}
