import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import Strava from '@/app/ui/dashboard/strava';

// 날씨, 신발, 활동
export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className='w-full h-full p-5'>
      {session ? <div>logged in</div> : <Strava />}
    </div>
  );
}
