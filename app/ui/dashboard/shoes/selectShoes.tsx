import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';

type shoesItem = {
  name: string;
  maker: string;
  image: string;
  milage: number;
  limit: number;
};

interface SelectShoesProps {
  setSelected: Dispatch<SetStateAction<string>>;
  shoes: shoesItem[];
}

export default function SelectShoes({ setSelected, shoes }: SelectShoesProps) {
  return (
    <Select onValueChange={setSelected}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='신발을 선택하세요' />
      </SelectTrigger>
      <SelectContent>
        {shoes.map((item) => {
          return (
            <SelectItem key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
