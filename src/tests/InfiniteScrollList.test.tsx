import { render, screen, fireEvent } from '@testing-library/react';
import InfiniteScrollList from '../componets/InfiniteScrollList';

test('Инициализация скролла', async () => {
  render(<InfiniteScrollList />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  const scrollContainer = screen.getByRole('Лист');
  fireEvent.scroll(scrollContainer, { target: { scrollTop: 100 } });

  expect(await screen.findByText('Новый предмет')).toBeInTheDocument();
});
