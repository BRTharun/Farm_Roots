// __tests__/HeaderSearch.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import HeaderSearch from '../../src/components/HeaderSearch'; // Adjust the path to your component
import searchParamReducer from '../../src/store/Reducer/searchParamSlice'; // Adjust the path

// Mocking the store
const store = configureStore({
  reducer: {
    searchParamSlice: searchParamReducer,
  },
});

// Mock function for navigation
const mockNavigate = vi.fn();

describe('HeaderSearch Component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderSearch />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByPlaceholderText(/Search Rice/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Click to speak/i })).toBeInTheDocument();
  });

  it('navigates to search page on div click', () => {
    // Mock useNavigate
    const navigate = vi.fn();
    vi.mock('react-router-dom', () => ({
      ...vi.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderSearch />
        </MemoryRouter>
      </Provider>
    );

    const searchDiv = screen.getByPlaceholderText(/Search Rice/i).closest('div');
    if (searchDiv) {
      fireEvent.click(searchDiv);
      expect(navigate).toHaveBeenCalledWith('/search');
    }
  });

  it('updates search input correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderSearch />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search Rice/i);
    fireEvent.change(input, { target: { value: 'Milk' } });
    expect(input.value).toBe('Milk');
  });

  it('toggles microphone state on click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderSearch />
        </MemoryRouter>
      </Provider>
    );

    const micButton = screen.getByRole('button', { name: /Click to speak/i });
    fireEvent.click(micButton);
    expect(screen.getByRole('button', { name: /Listening.../i })).toBeInTheDocument();
    fireEvent.click(micButton);
    expect(screen.getByRole('button', { name: /Click to speak/i })).toBeInTheDocument();
  });

  // Add more tests as needed
});
