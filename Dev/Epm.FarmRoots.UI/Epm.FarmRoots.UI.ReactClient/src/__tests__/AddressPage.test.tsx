import { render, screen } from '@testing-library/react';
import AddressPage from '../components/pages/profile/AddressPage'; 

describe('AddressPage', () => {
  test('renders AddressPage correctly', () => {
    render(<AddressPage />);
    
    const heading = screen.getByRole('heading', { name: /This is AddressPage/i });
    expect(heading).toBeInTheDocument();
  });
});

