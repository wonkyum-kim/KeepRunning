import { create } from 'zustand';

interface RecordState {
  isBlack: boolean;
  isBottom: boolean;
  isRight: boolean;
  isCol: boolean;
  toggleColor: () => void;
  toggleVertical: () => void;
  toggleHorizontal: () => void;
  toggleDirection: () => void;
}

export const useRecordStore = create<RecordState>()((set) => ({
  isBlack: true,
  isBottom: true,
  isRight: true,
  isCol: true,
  toggleColor: () => set((state) => ({ isBlack: !state.isBlack })),
  toggleVertical: () => set((state) => ({ isBottom: !state.isBottom })),
  toggleHorizontal: () => set((state) => ({ isRight: !state.isRight })),
  toggleDirection: () => set((state) => ({ isCol: !state.isCol })),
}));
