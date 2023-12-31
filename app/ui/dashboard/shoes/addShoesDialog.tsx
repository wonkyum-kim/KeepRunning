import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import Input from '../../input';
import { createShoes } from '@/app/actions/createShoes';

// TODO:

export default function AddShoesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-indigo-400 text-white rounded-lg w-[120px] h-12 text-sm md:text-md'>
          신발 등록
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>신발 추가하기</DialogTitle>
        </DialogHeader>
        <form action={createShoes} className='flex flex-col '>
          <Input type='text' id='shoesMaker' label='제조사' />
          <Input type='text' id='shoesName' label='이름' />
          <Input type='text' id='shoesImage' label='사진' />
          <div className='w-full flex items-center justify-end'>
            <DialogClose
              type='submit'
              className='bg-sky-500 w-16 h-8 rounded-lg text-white font-bold'
            >
              추가
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
