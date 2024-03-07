import type { Heat } from '../ui/main/calHeat';

export function getRunningStat(heats: Heat[], year: string, month: string) {
  const yearAcc = heats.reduce((acc, item) => {
    if (item.date.startsWith(year)) return acc + item.dist;
    return acc;
  }, 0);

  const yearPlay = heats.reduce((acc, item) => {
    if (item.date.startsWith(year)) return acc + 1;
    return acc;
  }, 0);

  const yearAvg = yearPlay === 0 ? 0 : (yearAcc / yearPlay).toFixed(2);

  const monthAcc = heats.reduce((acc, item) => {
    if (item.date.startsWith(`${year}-${month}`)) return acc + item.dist;
    return acc;
  }, 0);

  const monthPlay = heats.reduce((acc, item) => {
    if (item.date.startsWith(`${year}-${month}`)) return acc + 1;
    return acc;
  }, 0);

  const monthAvg = monthPlay === 0 ? 0 : (monthAcc / monthPlay).toFixed(2);

  return {
    yearAcc,
    yearPlay,
    yearAvg,
    monthAcc,
    monthPlay,
    monthAvg,
  };
}
