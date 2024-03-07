import { getDateString } from '@/app/libs/getDateString';

describe('날짜를 문자열로 변환', () => {
  it('getDateString', () => {
    const dateString = getDateString(new Date('2024-03-07'));
    expect(dateString).toBe('2024-03-07');
  });
});
