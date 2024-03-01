'use client';

import { calcStreak } from '@/app/libs/calcStreak';
import { useCalHeatmapStore } from '@/app/store/calHeatmapStore';

export default function ShowStreak() {
  const heats = useCalHeatmapStore((state) => state.heats);
  const streak = calcStreak(heats);
  return <p>현재 스트릭: {streak}일째</p>;
}
