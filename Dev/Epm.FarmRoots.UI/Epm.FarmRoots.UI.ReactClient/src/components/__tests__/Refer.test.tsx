import { render, screen, fireEvent } from '@testing-library/react';
import Refer from '../components/pages/profile/Refer'; 

describe('Refer Component', () => {
  let originalNavigatorShare: typeof navigator.share | undefined;

  beforeEach(() => {
    originalNavigatorShare = navigator.share;
  });

  afterEach(() => {
    if (originalNavigatorShare) {
      navigator.share = originalNavigatorShare;
    } else {
      delete (navigator as any).share; 
    }
  });

  test('shares referral link when share button is clicked', () => {
    
    render(<Refer />);
    navigator.share = jest.fn().mockResolvedValueOnce(undefined);
    const shareButton = screen.getByRole('button', { name: /share invite link/i });
    fireEvent.click(shareButton);
    expect(navigator.share).toHaveBeenCalledWith({
      title: 'FarmRoots - Refer and Earn',
      text: 'Hey! Check out FarmRoots - a grocery delivery app. Use my code FARMROOTS_XYZ123ABC to sign up and get 15% off on your first order!',
      url: 'http://localhost:3000/?referral=FARMROOTS_XYZ123ABC',
    });
  });

  test('shows alert if Web Share API is not supported', () => {
    const originalAlert = window.alert;
    window.alert = jest.fn();
    delete (navigator as any).share;
    render(<Refer />);
    const shareButton = screen.getByRole('button', { name: /share invite link/i });
    fireEvent.click(shareButton);

    expect(window.alert).toHaveBeenCalledWith('Web Share API is not supported in this browser.');
    window.alert = originalAlert;
  });
});

