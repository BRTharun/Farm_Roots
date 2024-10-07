import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageWrapper from '../Wrapper & Cards/PageWrapper';

describe('PageWrapper Component', () => {
    it('renders children when loader is false', () => {
      const { container } = render(
        <PageWrapper loader={false}>
          <div>Child Content</div>
        </PageWrapper>
      );
      const div = container.firstChild;

      expect(div).toBeTruthy();
      // Check class names
      expect(div.className).toContain('w-full');
      expect(div.className).toContain('lg:w-[85%]');
      expect(div.className).toContain('mx-auto');
      expect(div.className).toContain('flex');
      expect(div.className).toContain('flex-col');
      expect(div.className).toContain('justify-center');
      // Check if the children are rendered correctly
      expect(div.textContent).toBe('Child Content');
    });

    it('renders LoadingPage when loader is true', () => {
        const { getByTestId } = render(<PageWrapper loader={true} />);
        
        // Check if LoadingPage is rendered by looking for a test ID or class name
        const loadingPage = getByTestId('loading-page'); // Ensure you add data-testid="loading-page" to the LoadingPage component
        expect(loadingPage).toBeTruthy(); // Ensure LoadingPage is rendered
      });

    it('applies custom className', () => {
        const { container } = render(
          <PageWrapper className="custom-class" loader={false}>
            <div>Child Content</div>
          </PageWrapper>
        );
        const div = container.firstChild;
    
        // Check if the custom class is applied
        expect(div.className).toContain('custom-class');
      });


});
