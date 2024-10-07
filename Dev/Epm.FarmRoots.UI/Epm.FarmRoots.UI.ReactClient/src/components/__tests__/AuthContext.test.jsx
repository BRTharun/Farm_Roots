import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthProvider, useAuth } from '../context/AuthContext';

const TestComponent = () => {
    const { user, register } = useAuth();

    return (
        <div>
            <button onClick={() => register("John Doe", "john@example.com", "1234567890", "password", "user")}>
                Register
            </button>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Role: {user.role}</p>
                </div>
            )}
        </div>
    );
};

describe('AuthContext', () => {
    it('provides the user state and register function', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Check that user is initially null
        expect(screen.queryByText(/Name:/)).toBeNull();

        // Simulate registration
        const button = screen.getByText('Register');
        await act(async () => {
            fireEvent.click(button);
        });

        // Check that user details are rendered
        expect(screen.getByText(/Name: John Doe/)).toBeTruthy();
        expect(screen.getByText(/Email: john@example.com/)).toBeTruthy();
        expect(screen.getByText(/Phone: 1234567890/)).toBeTruthy();
        expect(screen.getByText(/Role: user/)).toBeTruthy();
    });

    it('throws an error when useAuth is called outside of AuthProvider', () => {
        const UseAuthOutside = () => {
            useAuth();
            return null;
        };

        expect(() => render(<UseAuthOutside />)).toThrow('useAuth must be used within an AuthProvider');
    });
});