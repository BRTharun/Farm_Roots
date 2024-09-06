import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CategoryPage from '../src/components/pages/user/CategoryPage';

// Mock the fetch function globally
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            {
                productId: 1,
                productName: 'Product 1',
                productDescription: 'Description for product 1',
                productCategory: 'meat',
                productStock: 10,
                productMrp: 100,
                productSalePrice: 80,
                productImage: 'image1.jpg',
            },
            {
                productId: 2,
                productName: 'Product 2',
                productDescription: 'Description for product 2',
                productCategory: 'meat',
                productStock: 20,
                productMrp: 150,
                productSalePrice: 120,
                productImage: 'image2.jpg',
            },
        ]),
    })
) as jest.Mock;

describe('CategoryPage', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    test('fetches and displays products based on category', async () => {
        render(
            <MemoryRouter initialEntries={['/category/meat']}>
                <CategoryPage />
            </MemoryRouter>
        );
        screen.debug();

        // Wait for products to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Description for product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
            expect(screen.getByText('Description for product 2')).toBeInTheDocument();
        });
    });

    test('displays loading text while fetching products', () => {
        render(
            <MemoryRouter initialEntries={['/category/meat']}>
                <CategoryPage />
            </MemoryRouter>
        );

        // Ensure loading text is displayed initially
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('handles fetch error gracefully', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error('Fetch failed'))
        );

        render(
            <MemoryRouter initialEntries={['/category/meat']}>
                <CategoryPage />
            </MemoryRouter>
        );

        // Ensure loading text is replaced and no products are displayed if fetch fails
        await waitFor(() => {
            expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
        });
    });
});
