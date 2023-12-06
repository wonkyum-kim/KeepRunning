/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('test', () => {
    render(<Home />);

    const heading = screen.getByText('Keep Running');

    expect(heading).toBeInTheDocument();
  });
});
