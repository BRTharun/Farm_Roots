import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryBar from '../src/components/pages/user/CategoryBar';

// Mock the fetch function globally
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            isSuccess: true,
            result: [
                { categoryId: 1, categoryName: 'Meat', imageUrl: null },
                { categoryId: 2, categoryName: 'Groceries', imageUrl: null },
                { categoryId: 3, categoryName: 'Fruits', imageUrl: null },
                { categoryId: 4, categoryName: 'Vegetables', imageUrl: null },
            ],
        }),
    })
) as jest.Mock;

describe('CategoryBar', () => {
    let originalConsoleError: (message?: any, ...optionalParams: any[]) => void;

    beforeAll(() => {
        // Mock console.error to suppress error messages in the test output
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.error after tests
        console.error = originalConsoleError;
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    test('fetches and displays categories', async () => {
        render(
            <Router>
                <CategoryBar />
            </Router>
        );

        // Wait for the categories to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Meat')).toBeInTheDocument();
            expect(screen.getByText('Groceries')).toBeInTheDocument();
            expect(screen.getByText('Fruits')).toBeInTheDocument();
            expect(screen.getByText('Vegetables')).toBeInTheDocument();
        });
    });

    test('renders the correct number of category links', async () => {
        render(
            <Router>
                <CategoryBar />
            </Router>
        );

        // Wait for the categories to be fetched and rendered
        await waitFor(() => {
            const categoryLinks = screen.getAllByRole('link');
            expect(categoryLinks).toHaveLength(4);
        });
    });

    test('handles fetch error gracefully', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error('Fetch failed'))
        );

        render(
            <Router>
                <CategoryBar />
            </Router>
        );

        // Ensure no categories are displayed if fetch fails
        await waitFor(() => {
            expect(screen.queryByText('Meat')).not.toBeInTheDocument();
        });
    });
});
