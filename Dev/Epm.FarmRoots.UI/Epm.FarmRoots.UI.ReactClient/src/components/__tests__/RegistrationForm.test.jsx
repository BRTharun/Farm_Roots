import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import RegistrationForm from '../features/RegistrationForm';
import { toast } from 'react-toastify';
import api from '../services/api';

vi.mock('../services/api');

describe('RegistrationForm', () => {
    beforeEach(() => {
      render(<RegistrationForm />);
    });
  
    it('renders the registration form', () => {
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const phoneInput = screen.getByLabelText(/phone number/i);
  
      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(confirmPasswordInput).toBeTruthy();
      expect(phoneInput).toBeTruthy();
    });
  
    it('handles input changes', () => {
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      expect(screen.getByLabelText(/name/i).value).toBe('John Doe');
  
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      expect(screen.getByLabelText(/email/i).value).toBe('john@example.com');
  
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
      expect(screen.getByLabelText(/password/i).value).toBe('Password123!');
  
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
      expect(screen.getByLabelText(/confirm password/i).value).toBe('Password123!');
  
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
      expect(screen.getByLabelText(/phone number/i).value).toBe('1234567890');
    });
  
    it('submits the form successfully', async () => {
      api.post.mockResolvedValueOnce({ data: { message: 'Success' } });
  
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
  
      fireEvent.click(screen.getByText(/submit/i));
  
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith(
          expect.any(String), // Check the URL is called
          expect.objectContaining({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            phoneNumber: '1234567890',
          })
        );
      });
    });
  
    it('shows validation errors on form submission', async () => {
        fireEvent.click(screen.getByText(/submit/i));
      
        await waitFor(() => {
          expect(screen.getByText(/name only contains alphabets and should not be empty/i)).toBeTruthy();
          expect(screen.getByText(/invalid email address/i)).toBeTruthy();
          expect(screen.getByText(/invalid password/i)).toBeTruthy();
          expect(screen.getByText(/invalid phone number/i)).toBeTruthy();
          expect(screen.getByText(/please select a role/i)).toBeTruthy(); // Adjust according to the actual error message
        });
      });
  });