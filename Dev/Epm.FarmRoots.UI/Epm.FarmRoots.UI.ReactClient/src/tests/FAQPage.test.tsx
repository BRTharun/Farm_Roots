import { render, screen, fireEvent } from '@testing-library/react';
import FAQS from '../components/pages/profile/FAQPage'; 

describe('FAQS Component', () => {
  beforeEach(() => {
    render(<FAQS />);
  });

  test('renders FAQS component', () => {
    const heading = screen.getByRole('heading', { name: /FAQs/i });
    expect(heading).toBeInTheDocument();
  });

  test('clicking on an FAQ toggles its answer', () => {
    const faqItem = screen.getByText(/Tell me about FarmRoots?/i); 
    fireEvent.click(faqItem);
    expect(screen.getByText(/Farm Roots is an online platform that offers fresh, locally sourced produce and groceries, connecting customers with local farms and suppliers./i)).toBeInTheDocument(); 

    
  });

  test('clicking "Contact Us" button opens email client', () => {
    const originalLocation = window.location;
    const mockLocation = {
      ...originalLocation,
      href: '',
      assign: jest.fn(),
    };

    // @ts-ignore to bypass TypeScript check
    delete window.location;
    // @ts-ignore to bypass TypeScript check
    window.location = mockLocation;

    const contactButton = screen.getByRole('button', { name: /contact us/i });
    expect(contactButton).toBeInTheDocument();

    fireEvent.click(contactButton);
    expect(mockLocation.href).toBe('mailto:support@farmroots.com');

    // @ts-ignore to bypass TypeScript check
    window.location = originalLocation;
  });
});
