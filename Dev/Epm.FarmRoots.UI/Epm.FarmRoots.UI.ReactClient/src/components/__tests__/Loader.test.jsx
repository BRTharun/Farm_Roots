import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../UI/Loader';
import { BiLoaderCircle } from 'react-icons/bi';

describe('Loader Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Loader />);
        expect(container).toBeTruthy();
    });

    it('renders with additional className', () => {
        const { container } = render(<Loader className="test-class" />);
        const loaderIcon = container.querySelector('svg'); // Select the SVG element directly
        expect(loaderIcon.classList.contains('test-class')).toBe(true);
    });

    it('has animate-spin class', () => {
        const { container } = render(<Loader />);
        const loaderIcon = container.querySelector('svg');
        expect(loaderIcon.classList.contains('animate-spin')).toBe(true);
    });

})