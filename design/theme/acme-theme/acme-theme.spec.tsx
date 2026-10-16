import { render } from '@testing-library/react';
import { AcmeTheme } from './acme-theme.js';

it('should render without errors', () => {
  const { container } = render(<AcmeTheme />);
  expect(container).toBeTruthy();
});
