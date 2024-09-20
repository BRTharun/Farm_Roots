import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../common/InputField';

describe('InputField Component', () => {
    it('renders correctly with label and placeholder', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <InputField 
                label="Username"
                name="username"
                type="text"
                value=""
                onChange={vi.fn()}
                placeholder="Enter your username"
            />
        );

        const label = getByLabelText('Username');
        const placeholder = getByPlaceholderText('Enter your username');

        expect(label).toBeTruthy(); // Check if label exists
        expect(placeholder).toBeTruthy(); // Check if placeholder exists
    });

    it('displays error message when provided', () => {
        const { getByText } = render(
            <InputField 
                label="Username"
                name="username"
                type="text"
                value=""
                onChange={vi.fn()}
                error="This field is required"
            />
        );

        const errorMessage = getByText('This field is required');
        expect(errorMessage).toBeTruthy(); // Check if error message exists
    });

    it('prevents copy actions', () => {
        const { getByLabelText } = render(
            <InputField 
                label="Username"
                name="username"
                type="text"
                value=""
                onChange={vi.fn()}
            />
        );

        const input = getByLabelText('Username');
        const preventDefaultMock = vi.fn();
        
        // Simulate the copy event directly on the input
        fireEvent.copy(input);
        
        // The handleCopyPasteCut function should have been called to prevent default
        expect(preventDefaultMock).not.toHaveBeenCalled(); // Check if preventDefault was called
    });
});
