'use client';

// https://velog.io/@rimmz/HTML-input-typenumber-%EA%B8%B0%EB%B3%B8-%EC%86%8D%EC%84%B1-%ED%99%94%EC%82%B4%ED%91%9C-%EC%A0%9C%EA%B1%B0-%ED%95%98%EA%B8%B0

import type { Record } from '../page';
import { FocusEventHandler, useState } from 'react';
import clsx from 'clsx';

interface UserInput {
  def: number;
  unit: string;
}

interface InputButtonsProps {
  updateRecord: (record: Partial<Record>) => void;
}

// test
function UserInput({ def, unit, updateRecord }: UserInput & InputButtonsProps) {
  const [isError, setIsError] = useState(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    let input = event.target.value;
    // 숫자인지 확인
    if (!/^\d+$/.test(input)) {
      setIsError(true);
      return;
    }
    if (isError) setIsError(false);
    // 앞의 0을 모두 제거
    input.replace(/^0+(?!$)/, '');
    let key = 'km';
    if (unit === '시간') key = 'hour';
    else if (unit === '분') key = 'min';
    else if (unit === '초') key = 'sec';
    if (input.length === 1 && unit !== 'km') input = '0' + input;
    updateRecord({ [key]: input });
  };

  return (
    <div className='relative'>
      <input
        type='number'
        className={clsx(
          'rounded-md ring-1 ring-blue-500 focus:outline-4 focus:outline-blue-500 p-2 w-full',
          isError && 'ring-red-500 focus:outline-red-500'
        )}
        defaultValue={def}
        onBlur={handleBlur}
      />
      <div className='absolute top-[8px] right-2'>{unit}</div>
    </div>
  );
}

export default function InputButtons({ updateRecord }: InputButtonsProps) {
  return (
    <div className='grid grid-cols-4 w-full gap-4 py-4'>
      <UserInput def={10} unit='km' updateRecord={updateRecord} />
      <UserInput def={1} unit='시간' updateRecord={updateRecord} />
      <UserInput def={0} unit='분' updateRecord={updateRecord} />
      <UserInput def={0} unit='초' updateRecord={updateRecord} />
    </div>
  );
}
