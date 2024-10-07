import { render, screen, fireEvent } from '@testing-library/react';
import FAQS from '../components/pages/profile/FAQPage';
import { mockFAQs } from '../components/pages/profile/mockFAQs'; 

interface FAQ {
  id: string;
  name: string;
  answer: string;
}

describe('FAQS Component', () => {
  beforeEach(() => {
    render(<FAQS />);
  });

  test('renders FAQS component with the heading', () => {
    const heading = screen.getByRole('heading', { name: /FAQs/i });
    expect(heading).toBeInTheDocument();
  });

  mockFAQs.forEach(({ name, answer }: FAQ) => {
    test(`clicking on FAQ "${name}" toggles its answer`, () => {
      const faqItem = screen.getByText(name);
      fireEvent.click(faqItem);
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
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
