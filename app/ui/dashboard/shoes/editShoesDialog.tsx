'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import SelectRecordForm from './selectRecordForm';

export default function EditShoesDialog({ name }: { name: string }) {
  // get strava
  const { data: strava } = useQuery({
    queryKey: ['strava'],
    queryFn: async () => {
      const response = await fetch('/api/getStrava', {
        next: { revalidate: 600 },
      });
      const data = await response.json();
      return data;
    },
  });

  // settings
  const activites = strava?.map((record: any) => {
    const totalTime = record.moving_time;
    const totalMin = Math.floor(totalTime / 60);
    const sec = totalTime - totalMin * 60;
    const hour = Math.floor(totalMin / 60);
    const min = totalMin - hour * 60;
    return {
      hour,
      min,
      sec,
      distance: (record.distance / 1000).toFixed(2),
      date: record.start_date_local,
      checked: false,
    };
  });

  // get checked records
  const { data: checked } = useQuery({
    queryKey: ['checked'],
    queryFn: async () => {
      const response = await fetch(`/api/getCheckedRecords?name=${name}`, {
        next: { revalidate: 600 },
      });
      const data = await response.json();
      return data.map((item: any) => item.date);
    },
  });

  activites?.forEach((act: any) => {
    if (checked?.includes(act.date)) {
      act.checked = true;
    }
  });

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
          <DialogTitle>이 신발을 신고 달린 기록을 고르세요.</DialogTitle>
          <SelectRecordForm records={activites} name={name} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
