import { create } from 'zustand';

interface ShoesState {
  selected: string;
  setSelected: (id: string) => void;
}

export const useShoesStore = create<ShoesState>()((set) => ({
  selected: 'null',
  setSelected: (id) => set(() => ({ selected: id })),
}));
