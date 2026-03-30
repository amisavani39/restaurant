import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

test('renders Fast Food Restaurant heading', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Fast Food Restaurant/i);
  expect(headingElement).toBeInTheDocument();
});
