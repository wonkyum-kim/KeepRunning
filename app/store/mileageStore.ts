import { create } from 'zustand';

export interface Shoes {
  id: string;
  maker: string;
  name: string;
  acc: number;
  goal: number;
  imageSrc: string;
  created: Date;
}

interface MileageState {
  allShoes: Shoes[];
  selectedShoes: Shoes | null;
  setAllShoes: (items: Shoes[]) => void;
  setSelectedShoes: (item: Shoes | null) => void;
}

export const useMileageStore = create<MileageState>()((set) => ({
  allShoes: [],
  selectedShoes: null,
  setAllShoes: (items: Shoes[]) => set(() => ({ allShoes: items })),
  setSelectedShoes: (item: Shoes | null) =>
    set(() => ({ selectedShoes: item })),
}));
