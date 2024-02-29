import Image from 'next/image';
import { ShoesProps } from '../page';
import styles from './shoesCard.module.css';

type FrontFaceProps = Pick<
  ShoesProps,
  'maker' | 'name' | 'imageSrc' | 'acc' | 'goal'
>;

export default function FrontFace({
  maker,
  name,
  imageSrc,
  acc,
  goal,
}: FrontFaceProps) {
  const editHandler = () => {
    // TODO
  };
  return (
    <div className={styles.card__face}>
      <div className='bg-sky-500 w-full py-2 px-4 flex flex-col relative rounded-lg'>
        <div className='w-full text-left text-2xl'>{maker}</div>
        <div className='w-full text-left'>{name}</div>
        <button
          id='edit'
          onClick={editHandler}
          className='hover:bg-sky-200 text-xl absolute bg-sky-100 w-10 h-10 rounded-lg right-4 top-1/2 translate-y-[-50%] z-10'
        >
          ✏️
        </button>
      </div>
      <figure className={styles.photo}>
        {imageSrc !== 'null' && (
          <>
            <Image
              src={imageSrc}
              alt={name}
              width={300}
              height={300}
              className='w-[70%] aspect-square object-contain'
            />
            <figcaption className='min-[425px]:text-xl w-full md:w-[70%] text-black flex justify-around'>
              <div className='flex flex-col'>
                <p>{acc}km</p>
                <p>누적 거리</p>
              </div>
              <div className='flex flex-col'>
                <p>{goal}km</p>
                <p>목표 거리</p>
              </div>
              <div className='flex flex-col'>
                <p>{((acc / goal) * 100).toFixed(1)}%</p>
                <p>진행률</p>
              </div>
            </figcaption>
          </>
        )}
      </figure>
    </div>
  );
}
