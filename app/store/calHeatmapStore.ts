import { create } from 'zustand';
import type { Heat } from '../ui/main/calHeat';

interface CalHeatmapState {
  year: string;
  setYear: (y: string) => void;
  heats: Heat[];
  setHeats: (item: Heat[]) => void;
}

export const useCalHeatmapStore = create<CalHeatmapState>()((set) => ({
  year: new Date().getFullYear().toString(),
  setYear: (y: string) => set(() => ({ year: y })),
  heats: [],
  setHeats: (item: Heat[]) => set(() => ({ heats: item })),
}));
