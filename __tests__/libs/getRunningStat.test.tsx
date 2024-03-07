import type { Heat } from '@/app/ui/main/calHeat';
import { getRunningStat } from '@/app/libs/getRunningStat';

describe('getRunningStat', () => {
  const heats: Heat[] = [
    { id: 'test1', date: '2024-03-01', dist: 5 },
    { id: 'test2', date: '2024-03-02', dist: 10 },
    { id: 'test3', date: '2024-03-03', dist: 8.5 },
    { id: 'test4', date: '2024-03-04', dist: 11.5 },
    { id: 'test5', date: '2024-04-01', dist: 16.57 },
    { id: 'test6', date: '2023-04-01', dist: 18.6 },
  ];

  const setup = (year: string, month: string) =>
    getRunningStat(heats, year, month);

  it.each([['2023'], ['2024']])('%s년도 누적 거리 테스트', (year) => {
    const month = '03';
    const { yearAcc } = setup(year, month);
    expect(yearAcc).toBe(
      heats.reduce((acc, item) => {
        if (item.date.startsWith(year)) return acc + item.dist;
        return acc;
      }, 0)
    );
  });

  it.each([['2023'], ['2024']])('%s년도 누적 활동 테스트', (year) => {
    const month = '03';
    const { yearPlay } = setup(year, month);
    expect(yearPlay).toBe(
      heats.reduce((acc, item) => {
        if (item.date.startsWith(year)) return acc + 1;
        return acc;
      }, 0)
    );
  });

  it.each([['2024'], ['2023']])('%s년도 평균 거리 테스트', (year) => {
    const month = '03';
    const { yearAcc, yearAvg, yearPlay } = setup(year, month);
    expect(yearAvg).toBe((yearAcc / yearPlay).toFixed(2));
  });

  it('해당 년도에 달린 적이 없으면 평균은 0이다.', () => {
    const year = '2025';
    const month = '03';
    const { yearAvg } = setup(year, month);
    expect(yearAvg).toBe(0);
  });

  it.each([
    ['2024', '03'],
    ['2024', '04'],
  ])('%s년도 %s월 누적 거리 테스트', (year, month) => {
    const { monthAcc } = setup(year, month);
    expect(monthAcc).toBe(
      heats.reduce((acc, item) => {
        if (item.date.startsWith(`${year}-${month}`)) return acc + item.dist;
        return acc;
      }, 0)
    );
  });

  it.each([
    ['2024', '03'],
    ['2024', '04'],
  ])('%s년도 %s월 누적 활동 테스트', (year, month) => {
    const { monthPlay } = setup(year, month);
    expect(monthPlay).toBe(
      heats.reduce((acc, item) => {
        if (item.date.startsWith(`${year}-${month}`)) return acc + 1;
        return acc;
      }, 0)
    );
  });

  it.each([
    ['2024', '03'],
    ['2024', '04'],
  ])('%s년도 %s월 평균 거리 테스트', (year, month) => {
    const { monthAcc, monthAvg, monthPlay } = setup(year, month);
    expect(monthAvg).toBe((monthAcc / monthPlay).toFixed(2));
  });

  it('해당 월에 달린 적이 없으면 평균은 0이다.', () => {
    const year = '2025';
    const month = '03';
    const { monthAvg } = setup(year, month);
    expect(monthAvg).toBe(0);
  });
});
