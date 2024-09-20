import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../common/Button';

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button type="button">Click Me</Button>);
        const buttons = screen.getAllByText('Click Me');
        expect(buttons.length).toBeGreaterThan(0); // Check at least one button exists
        expect(buttons[0]).toBeTruthy(); // Check the first button is in the document
      });
  });