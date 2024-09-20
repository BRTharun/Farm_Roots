import { render, screen, fireEvent } from '@testing-library/react';
import OrdersPage from '../components/pages/profile/OrdersPage';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('OrdersPage', () => {
  it('renders image, description, and multiple buttons correctly', () => {
    render(<OrdersPage />);

    const img = screen.getByAltText(/No Orders/i);
    expect(img).toBeInTheDocument();

    const description = screen.getByText(/No orders yet/i);
    expect(description).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /Browse Products/i });
    expect(buttons.length).toBeGreaterThan(0); 
  });

  it('navigates to home page when the first button is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<OrdersPage />);

    const buttons = screen.getAllByRole('button', { name: /Browse Products/i });
    fireEvent.click(buttons[0]); // Click the first button

    expect(navigate).toHaveBeenCalledWith('/');
  });
});

