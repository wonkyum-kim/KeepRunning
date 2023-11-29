import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export default function EditShoesDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src='/edit.svg'
          alt='edit'
          width={24}
          height={24}
          className='absolute top-1/2 right-4 cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
