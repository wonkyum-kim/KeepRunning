'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Strava() {
  const router = useRouter();
  const handleClick = async () => {
    const callback = await signIn('strava', { redirect: false });
    if (callback?.ok) {
      router.push('/dashboard/activities');
    }
  };
  return <div onClick={() => handleClick()}>로그인</div>;
}
