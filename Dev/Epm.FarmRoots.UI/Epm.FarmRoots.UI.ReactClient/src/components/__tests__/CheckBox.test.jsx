import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CheckBox from '../common/CheckBox';

describe('CheckBox Component', () => {
    it('renders correctly and handles onChange', () => {
      const onChangeMock = vi.fn();
      render(<CheckBox checked={false} onChange={onChangeMock}/>);
  
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveProperty('checked', false);
  
      fireEvent.click(checkbox);
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });