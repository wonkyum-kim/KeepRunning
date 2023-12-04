import { editRecords } from '@/app/actions/editRecords';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose } from '@/components/ui/dialog';

interface PastRecord {
  hour: number;
  min: number;
  sec: number;
  distance: number;
  date: string;
  checked: boolean;
}

interface SelectRecordFormProps {
  records: PastRecord[];
  name: string;
}

export default function SelectRecordForm({
  records,
  name,
}: SelectRecordFormProps) {
  return (
    <form
      className='flex flex-col overflow-auto max-h-[250px] gap-4 py-4'
      action={editRecords}
    >
      <input type='hidden' value={name} name='name' />
      {records.map((record) => {
        return (
          <div key={record.date} className='flex gap-2'>
            <Checkbox name={record.date} defaultChecked={record.checked} />
            <label
              htmlFor={record.date}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              <div>
                {record.date} {record.distance}km {record.hour}h {record.min}m
                {record.sec}s
              </div>
            </label>
          </div>
        );
      })}
      <DialogClose
        className='w-24 bg-sky-500 text-white rounded-lg'
        type='submit'
      >
        수정
      </DialogClose>
    </form>
  );
}
