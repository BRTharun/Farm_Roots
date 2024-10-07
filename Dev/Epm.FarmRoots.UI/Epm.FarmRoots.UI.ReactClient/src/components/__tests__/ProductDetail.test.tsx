import { render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetail from '../components/pages/products/ProductDetail';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ productId: '123' }), // Mock useParams to return a fake product ID
  useNavigate: jest.fn(), // Mock useNavigate if it's used
}));

// Mock the API response data
const mockProductData = {
  id: '123',
  name: 'Sample Product',
  price: 29.99,
  description: 'This is a sample product.',
};

beforeEach(() => {
  fetchMock.resetMocks(); // Reset the mock before each test
});

describe('ProductDetail component', () => {

  it('displays loading state initially', () => {
    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockProductData));

    render(
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    );

    // Assert that loading state is shown initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

});
