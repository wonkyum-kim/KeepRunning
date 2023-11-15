'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaStrava } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { formAction } from '@/app/lib/formAction';
import Input from './input';

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
  const router = useRouter();
  const { status } = useSession();
  const [variant, setVariant] = useState<Variant>('LOGIN');

  const handleClick = async () => {
    const callback = await signIn('strava', { redirect: false });
    if (callback?.ok) {
      router.push('/dashboard/activities');
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
      <div className='w-[220px]'>
        <form action={formAction}>
          {variant === 'REGISTER' && (
            <Input id='name' label='이름' type='text' name='name' />
          )}
          <Input id='email' label='이메일' type='email' name='email' />
          <Input
            id='password'
            label='패스워드'
            type='password'
            name='password'
          />
          <div className='flex w-full h-full itmes-center justify-center py-4'>
            <button
              type='submit'
              className='hover:bg-blue-400 text-lg font-bold cursor-pointer bg-blue-500 text-white w-full rounded-md h-8'
            >
              {variant === 'LOGIN' ? '로그인' : '가입하기'}
            </button>
          </div>
        </form>
      </div>
      <div className='hover:bg-orange-300 cursor-pointer w-[220px] h-8 rounded-md flex gap-2 items-center justify-center bg-orange-400 font-bold text-lg text-white'>
        <FaStrava />
        <p>스트라바</p>
      </div>
      <div className='underline cursor-pointer py-2' onClick={toggleVariant}>
        {variant === 'LOGIN' ? '가입하기' : '로그인'}
      </div>
    </div>
  );
}
