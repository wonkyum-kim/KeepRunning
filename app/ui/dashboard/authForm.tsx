'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaStrava } from 'react-icons/fa';
import { useCallback, useState } from 'react';

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const stravaLogin = () => {
    setIsLoading(true);
    signIn('strava', { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          console.log('strava error');
        }
        if (callback?.ok) {
          router.push('/dashboard');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='w-full min-h-full flex flex-col items-center justify-center gap-2'>
      <div className='w-[220px]'></div>
      <div
        onClick={stravaLogin}
        className='hover:bg-orange-300 cursor-pointer w-[220px] h-8 rounded-md flex gap-2 items-center justify-center bg-orange-400 font-bold text-lg text-white'
      >
        <FaStrava />
        <p>Strava</p>
      </div>
    </div>
  );
}
