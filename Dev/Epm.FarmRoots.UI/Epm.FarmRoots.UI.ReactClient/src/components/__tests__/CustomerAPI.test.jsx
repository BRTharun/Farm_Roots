import { describe, it, expect, vi, afterEach } from 'vitest';


const API_URL = 'https://localhost:7116/api/Customer/register';


const registerCustomer = async (customerData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to register customer');
    }
  
    return response.json();
  };
  
  // Mock the fetch function
  global.fetch = vi.fn();
  
  describe('Customer API', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it('should register a customer successfully', async () => {
      const mockResponse = {
        message: 'Customer registered successfully',
        customerId: 1,
      };
  
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const customerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
      };
  
      const response = await registerCustomer(customerData);
  
      expect(fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('should handle registration errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Registration failed' }),
      });
  
      const customerData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
      };
  
      try {
        await registerCustomer(customerData);
      } catch (error) {
        expect(error.message).toBe('Failed to register customer');
      }
  
      expect(fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
    });
  });