import clsx from 'clsx';
import { ShoesProps } from '../page';
import styles from './shoesCard.module.css';
import { editDataFromIndexedDB } from '@/app/libs/idb';

export default function BackFace({
  acc,
  goal,
  id,
}: Pick<ShoesProps, 'acc' | 'goal' | 'id'>) {
  const editDB = async (formData: FormData) => {
    const newAcc = +(formData.get('edit-acc') as string);
    const newGoal = +(formData.get('edit-goal') as string);

    const success = await editDataFromIndexedDB<ShoesProps>(
      { acc: newAcc, goal: newGoal, id },
      id
    );

    if (success) {
      // TODO: Toast 적용
    }
  };

  return (
    <div className={clsx(styles.card__face, styles['card__face--back'])}>
      <form
        className='text-black text-left flex flex-col gap-4'
        id='edit-prev'
        action={editDB}
      >
        <h1 className='text-xl'>✏️ 기존 기록 수정</h1>
        <div className='w-full flex justify-between relative'>
          <label htmlFor='edit-acc' className='min-w-[30%]'>
            현재 누적 마일리지
          </label>
          <input
            id='edit-acc'
            name='edit-acc'
            type='number'
            step='0.01'
            className='border-2 max-w-[50%] border-blue-300  focus:outline-blue-500 rounded-lg pl-4'
            defaultValue={acc}
            required
          />
          <div className='right-2 absolute text-blue-500 top-1/2 translate-y-[-50%]'>
            km
          </div>
        </div>
        <div className='w-full flex justify-between relative'>
          <label htmlFor='edit-acc' className='min-w-[30%]'>
            목표 누적 마일리지
          </label>
          <input
            id='edit-goal'
            name='edit-goal'
            type='number'
            step='0.01'
            className='border-2 max-w-[50%] border-blue-300 focus:outline-blue-500 rounded-lg pl-4'
            defaultValue={goal}
          />
          <div className='right-2 absolute text-blue-500 top-1/2 translate-y-[-50%]'>
            km
          </div>
        </div>
        <button className='bg-blue-500 hover:bg-blue-400 w-[100px] text-white rounded-lg place-self-end'>
          수정
        </button>
      </form>
    </div>
  );
}
