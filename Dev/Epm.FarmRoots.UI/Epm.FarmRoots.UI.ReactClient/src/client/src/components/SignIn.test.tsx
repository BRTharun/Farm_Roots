// src/components/SignIn.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

// Mock the AuthService class and its login method
jest.mock('../services/auth.service', () => {
    return jest.fn().mockImplementation(() => ({
        login: jest.fn().mockResolvedValue({ data: { access_token: 'mock_token' }, error: null }),
    }));
});

// Mock the navigate function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Type assertion to cast the mocked useNavigate
// const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe('SignIn Component', () => {
    beforeEach(() => {
        // Clear mock function calls and reset mocks
        mockNavigate.mockClear();
        jest.clearAllMocks();
    });

    test('renders SignIn form correctly', () => {
        render(<SignIn />);
        expect(screen.getByPlaceholderText('Username or Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('LOGIN')).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });

    test('updates input fields correctly', () => {
        render(<SignIn />);

        fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        });

        expect(screen.getByPlaceholderText('Username or Email')).toHaveValue('test@example.com');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('password123');
    });

    test('submits form and redirects on successful login', async () => {
        render(<SignIn />);

        fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText('LOGIN'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/home');
            expect(localStorage.getItem('access_token')).toBe('mock_token');
        });
    });

    test('displays error message on failed login', async () => {
        // Change the mock implementation for this specific test
        (AuthService.prototype.login as jest.Mock).mockResolvedValue({
            data: null,
            error: 'Invalid credentials',
        });

        render(<SignIn />);

        fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByText('LOGIN'));

        await waitFor(() => {
            expect(screen.getByText('Login failed. Please check your credentials and try again.')).toBeInTheDocument();
        });
    });
});
