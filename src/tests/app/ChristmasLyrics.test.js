import React from 'react';
import { render } from '@testing-library/react';
import ChristmasLyrics from '../../app/ChristmasLyrics';

test('renders Christmas Songs', () => {
  const { getByText } = render(<ChristmasLyrics />);
  const linkElement = getByText(/Christmas Songs/i);
  expect(linkElement).toBeInTheDocument();
});
