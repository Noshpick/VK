import { render, screen, fireEvent } from '@testing-library/react';
import { ListItem } from '../componets/ListItem';

const mockItem = { id: 1, name: 'Обнова' };

test('рендер и обнв приложения', () => {
  render(<ListItem item={mockItem} />);

  expect(screen.getByText('Тест')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Редактировать'));
  const input = screen.getByDisplayValue('Тест');

  fireEvent.change(input, { target: { value: 'Обнова' } });
  fireEvent.click(screen.getByText('Сохранить'));

  expect(screen.getByText('Обнова')).toBeInTheDocument();
});
