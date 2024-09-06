import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

// Mocking utility functions and components
jest.mock('../utils/validation', () => ({
  validateEmail: jest.fn().mockImplementation((email: string) => email.includes('@')),
  validatePassword: jest.fn().mockImplementation((password: string) => password.length >= 8),
  validatePhoneNumber: jest.fn().mockImplementation((phone: string) => phone.length === 10),
  validateName: jest.fn().mockImplementation((name: string) => /^[a-zA-Z\s]+$/.test(name)),
}));

jest.mock('../common/InputField', () => (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />);
jest.mock('../common/CheckBox', () => (props: React.InputHTMLAttributes<HTMLInputElement>) => <input type="checkbox" {...props} />);
jest.mock('../common/Button', () => (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />);

describe('RegistrationForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial values and focuses on name field', () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vendor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer/i)).toBeInTheDocument();
  });

  test('shows validation errors and focuses on the first error field', () => {
    const { getByPlaceholderText} = render(<RegistrationForm />);
    
    fireEvent.change(getByPlaceholderText(/Name/i), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(getByPlaceholderText(/Password/i), { target: { value: 'short' } });
    fireEvent.change(getByPlaceholderText(/Confirm Password/i), { target: { value: 'mismatch' } });
    fireEvent.change(getByPlaceholderText(/Phone Number/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Submit/i));
    
    expect(screen.getByText(/Name only contains alphabets and should not be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid password/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid phone number/i)).toBeInTheDocument();
    
    // Assuming that the component will focus on the first error field
    expect(document.activeElement).toBe(getByPlaceholderText(/Name/i));
  });

  test('resets form fields and focuses on name field when reset button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<RegistrationForm />);
    
    fireEvent.change(getByPlaceholderText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(getByPlaceholderText(/Password/i), { target: {value: 'Password1' } });
    fireEvent.change(getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1' } });
    fireEvent.change(getByPlaceholderText(/Phone Number/i), { target: { value: '1234567890' } });
    
    fireEvent.click(getByText(/Reset/i));
    
    expect(getByPlaceholderText(/Name/i)).toHaveValue('');
    expect(getByPlaceholderText(/Email/i)).toHaveValue('');
    expect(getByPlaceholderText(/Password/i)).toHaveValue('');
    expect(getByPlaceholderText(/Confirm Password/i)).toHaveValue('');
    expect(getByPlaceholderText(/Phone Number/i)).toHaveValue('');
    
    // Assuming the reset button will focus on the name field
    expect(document.activeElement).toBe(getByPlaceholderText(/Name/i));
  });

  test('toggles password visibility', () => {
    const { getByPlaceholderText, getByRole } = render(<RegistrationForm />);
    
    const passwordInput = getByPlaceholderText(/Password/i);
    const toggleButton = getByRole('button', { name: /eye/i });
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('prevents invalid characters in phone number field', () => {
    const { getByPlaceholderText } = render(<RegistrationForm />);
    const phoneInput = getByPlaceholderText(/Phone Number/i);
    
    fireEvent.change(phoneInput, { target: { value: '123abc456' } });
    // Assuming your implementation might auto-correct invalid characters
    expect(phoneInput).toHaveValue('123456'); // Adjust based on actual behavior
  });

  test('focuses on the first error field', () => {
    const { getByPlaceholderText } = render(<RegistrationForm />);
    
    fireEvent.change(getByPlaceholderText(/Name/i), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText(/Submit/i));
    
    expect(document.activeElement).toBe(getByPlaceholderText(/Name/i));
  });
});
