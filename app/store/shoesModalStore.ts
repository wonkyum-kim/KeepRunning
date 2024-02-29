import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useShoesModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  onClose: () => set(() => ({ isOpen: false })),
  onOpen: () => set(() => ({ isOpen: true })),
}));
