import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import LogOut from '@/app/ui/dashboard/logOut';
import Link from 'next/link';

// 날씨, 신발, 활동
export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className='w-full h-full p-5'>
      {session ? <LogOut /> : <Link href='/dashboard/signIn'>로그인</Link>}
    </div>
  );
}
