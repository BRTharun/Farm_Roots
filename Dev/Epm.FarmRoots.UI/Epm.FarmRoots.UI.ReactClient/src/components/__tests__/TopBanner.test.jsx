import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // To provide Router context
import TopBanner from '../common/HomePage/UI/TopBanner';
import Banner from '../../assets/images/TopBannerImage.png'; // Ensure this path is correct

describe('TopBanner Component', () => {
    test('renders TopBanner and displays image with correct alt text and link', () => {
      render(
        <Router>
          <TopBanner />
        </Router>
      );
  
      // Check if the image is rendered
      const image = screen.getByAltText('main component');
      expect(image).not.toBeNull(); // Check that image exists
  
      // Check if the image has the correct src attribute
      expect(image.getAttribute('src')).toBe(Banner);
  
      // Check if the image is wrapped in a Link
      const link = screen.getByRole('link');
      expect(link).not.toBeNull(); // Check that link exists
      expect(link.getAttribute('href')).toBe('/');
    });
  });