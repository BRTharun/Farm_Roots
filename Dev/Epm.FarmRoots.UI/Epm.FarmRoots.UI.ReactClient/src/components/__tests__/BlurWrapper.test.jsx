import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlurWrapper from '../Wrapper & Cards/BlurWrapper';

describe('BlurWrapper Component', () => {
    it('renders correctly with default className', () => {
      const { container } = render(<BlurWrapper>Test Content</BlurWrapper>);
      const div = container.firstChild;

        // Check if the div is rendered
    expect(div).toBeTruthy();
    // Check class names
    expect(div.className).toContain('z-50');
    expect(div.className).toContain('blurWrapper');
    expect(div.className).toContain('fixed');
    expect(div.className).toContain('top-0');
    expect(div.className).toContain('left-0');
    expect(div.className).toContain('w-screen');
    expect(div.className).toContain('h-screen');
    // Check if the children are rendered correctly
    expect(div.textContent).toBe('Test Content');
  });

  it('applies custom className', () => {
    const { container } = render(<BlurWrapper className="custom-class">Test Content</BlurWrapper>);
    const div = container.firstChild;

    // Check if the div is rendered
    expect(div).toBeTruthy();
    // Check if the custom class is applied
    expect(div.className).toContain('custom-class');
  });
});