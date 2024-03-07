import { render, screen } from '@testing-library/react';
import AddHeat from '@/app/ui/main/addHeat';

beforeEach(() => {
  render(<AddHeat />);
});

describe('AddHeat 테스트', () => {
  const setup = () => {
    const dateInput = screen.getByTestId('date-input');
    const distInput = screen.getByTestId('dist-input');
    return { dateInput, distInput };
  };
  it('날짜 입력 범위 테스트', () => {
    const input = setup().dateInput;
    expect(input).toHaveAttribute('min', '2024-01-01');
    expect(input).toHaveAttribute('max', '2030-12-31');
  });
  it('거리 입력 단위 테스트', () => {
    const input = setup().distInput;
    expect(input).toHaveAttribute('step', '0.01');
  });
});
