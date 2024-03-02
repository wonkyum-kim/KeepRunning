import type { Heat } from '../ui/main/calHeat';
import { getDateString } from './getDateString';

export function calcStreak(heats: Heat[]) {
  const todayDateString = getDateString(new Date());
  let todayIndex = heats.findIndex(
    (item) => item.date === todayDateString && item.dist !== 0
  );
  if (todayIndex === -1) return 0;

  let streak = 1;
  for (let i = todayIndex - 1; i >= 0; --i) {
    const prevDay = new Date();
    const diff = todayIndex - i;
    prevDay.setDate(new Date().getDate() - diff);
    const prevDateString = getDateString(prevDay);
    if (heats[i].date !== prevDateString || heats[i].dist === 0) break;
    streak++;
  }
  return streak;
}
