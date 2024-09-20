import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Brand from '../common/Header/UI/Brand';


describe('Brand component', () => {
    test('renders Brand component with correct text and link', () => {
        render(
            <Router>
                <Brand />
            </Router>
        );

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading.textContent).toBe('FarmRoots'); // Use textContent directly
    
        // Check if the text "Farm" has the correct class for color
        const farmSpan = screen.getByText('Farm');
        expect(farmSpan.className).toContain('text-green-800');
    
        // Check if the text "Roots" has the correct class for color
        const rootsSpan = screen.getByText('Roots');
        expect(rootsSpan.className).toContain('text-black');
    
        // Check if the component is wrapped in a Link with correct href
        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe('/');

    });
});

