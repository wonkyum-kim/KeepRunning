import Input from '@/app/ui/input';
import { createShoes } from '@/app/actions/createShoes';
import Shoes from '@/app/ui/dashboard/overview/shoes';
import getShoes from '@/app/actions/getShoes';

export default async function ShoesPage() {
  await getShoes();
  return (
    <div className='w-full min-h-full p-5 m-5 flex gap-8 bg-gray-50 rounded-lg'>
      <Shoes />

      {/* <div className='w-full flex flex-col bg-sky-300 gap-4 text-white font-bold text-xl rounded-lg p-4'>
        <div>신발 추가</div>
        <form action={createShoes} className='flex flex-col lg:flex-row gap-4'>
          <Input type='text' id='shoesName' label='신발' />
          <Input type='text' id='shoesImage' label='사진' />
          <button type='submit' className='bg-sky-500 w-16 rounded-lg'>
            추가
          </button>
        </form>
      </div> */}
    </div>
  );
}
