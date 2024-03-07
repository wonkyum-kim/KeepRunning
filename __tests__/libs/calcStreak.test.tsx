import type { Heat } from '@/app/ui/main/calHeat';
import { calcStreak } from '@/app/libs/calcStreak';
import { getDateString } from '@/app/libs/getDateString';

describe('streak', () => {
  it('스트릭이 0', () => {
    const heats: Heat[] = [];
    const streak = calcStreak(heats);
    expect(streak).toBe(0);
  });

  it('스트릭이 3', () => {
    const heats: Heat[] = [];
    const dates = [];

    // 오늘을 포함해서 3일치를 거꾸로 넣는다.
    for (let i = 0; i < 3; ++i) {
      dates.push(new Date());
      dates[i].setDate(new Date().getDate() - (2 - i));
    }
    const datesString = dates.map((item) => getDateString(item));
    datesString.forEach((item) => {
      heats.push({ id: 'test', date: item, dist: 5 });
    });

    expect(calcStreak(heats)).toBe(3);
  });

  it('오늘 날짜를 넣지 않는다.', () => {
    const heats: Heat[] = [];
    const dates = [];

    // 오늘을 포함해서 3일치를 거꾸로 넣고, 오늘 날짜를 지운다.
    for (let i = 0; i < 3; ++i) {
      dates.push(new Date());
      dates[i].setDate(new Date().getDate() - (2 - i));
    }
    dates.pop();
    const datesString = dates.map((item) => getDateString(item));
    datesString.forEach((item) => {
      heats.push({ id: 'test', date: item, dist: 5 });
    });

    expect(calcStreak(heats)).toBe(0);
  });
});
