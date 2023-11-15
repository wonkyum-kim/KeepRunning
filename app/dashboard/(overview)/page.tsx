import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import AuthForm from '@/app/ui/dashboard/authForm';
import LogOut from '@/app/ui/dashboard/logout';

// 날씨, 신발, 활동
export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className='w-full h-full p-5'>
      {session ? <LogOut /> : <AuthForm />}
    </div>
  );
}
