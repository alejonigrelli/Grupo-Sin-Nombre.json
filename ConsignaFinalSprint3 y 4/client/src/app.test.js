import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

test('renderiza el título de inicio', async () => {
  render(<App />);
  expect(screen.getByText(/Muebles con estilo para tu hogar/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText(/Cargando productos destacados/i)).not.toBeInTheDocument();
  });
});
