// NewVendorProfile.test.tsx

import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewVendorProfile from '../vendor/VendorAddress'; // Correct path to your component
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import store from '../../store/MainStore/store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

describe('NewVendorProfile', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders loading shimmer when data is being fetched', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {});
    
    render(
      <Provider store={store}>
        <MemoryRouter> 
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    // Assume Shimmer component has a test ID for querying
    await waitFor(() => expect(screen.getByTestId('shimmer')).toBeInTheDocument());
  });

  test('displays error message when no addresses found', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(404, 'No addresses found for Vendor ID 1.');
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Add Address')).toBeInTheDocument();
  });


  test('shows validation errors on empty form submission', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {});

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <NewVendorProfile />
          </MemoryRouter>
        </Provider>
      );
    });

      fireEvent.click(await screen.findByText('Add Address'));
      const x = await waitFor(() => screen.findByText('Add'));
    fireEvent.click(x);

    await waitFor(()=>expect(screen.getByText('Vendor Shop Name is required')).toBeInTheDocument());
    expect(screen.getByText('House No and Floor is required')).toBeInTheDocument();
    expect(screen.getByText('Building and Block No is required')).toBeInTheDocument();
    expect(screen.getByText('Pincode is required')).toBeInTheDocument();
  });

  test('validates pincode format', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Add Address'));
    
    fireEvent.change(screen.getByLabelText(/Pincode/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(screen.getByText('Invalid Pincode format')).toBeInTheDocument();
    });
  });


  test('can add new address', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {});
    mock.onPost('https://localhost:7116/api/Vendor/vendors/1/AddAddresses').reply(200, [{
      vendorAddressId: 1,
      vendorShopName: 'Test Shop',
      houseNoAndFloor: '123',
      buildingAndBlockNo: 'Block A',
      pincode: '123456',
      landmarkAndAreaName: 'Near Park',
      vendorId: 1,
    }]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Add Address'));

    fireEvent.change(screen.getByLabelText(/Vendor Shop Name/i), { target: { value: 'Test Shop' } });
    fireEvent.change(screen.getByLabelText(/House No and Floor/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Building and Block No/i), { target: { value: 'Block A' } });
    fireEvent.change(screen.getByLabelText(/Pincode/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Landmark and Area Name/i), { target: { value: 'Near Park' } });

    fireEvent.click(screen.getByText('Add'));

  });

  test('can edit existing address', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {
      vendorAddressId: 1,
      vendorShopName: 'Test Shop',
      houseNoAndFloor: '123',
      buildingAndBlockNo: 'Block A',
      pincode: '123456',
      landmarkAndAreaName: 'Near Park',
      vendorId: 1,
    });

    mock.onPut('https://localhost:7116/api/Vendor/1/addresses/1').reply(200, {
      vendorAddressId: 1,
      vendorShopName: 'Updated Shop',
      houseNoAndFloor: '123',
      buildingAndBlockNo: 'Block A',
      pincode: '123456',
      landmarkAndAreaName: 'Near Park',
      vendorId: 1,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Edit'));

    fireEvent.change(screen.getByLabelText(/Vendor Shop Name/i), { target: { value: 'Updated Shop' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => screen.findByText('Updated Shop'));

    expect(screen.getByText('Updated Shop')).toBeInTheDocument();
  });

  
  
  test('cancels editing address', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {
      vendorAddressId: 1,
      vendorShopName: 'Test Shop',
      houseNoAndFloor: '123',
      buildingAndBlockNo: 'Block A',
      pincode: '123456',
      landmarkAndAreaName: 'Near Park',
      vendorId: 1,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  test('shows correct initial values when editing', async () => {
    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, {
      vendorAddressId: 1,
      vendorShopName: 'Test Shop',
      houseNoAndFloor: '123',
      buildingAndBlockNo: 'Block A',
      pincode: '123456',
      landmarkAndAreaName: 'Near Park',
      vendorId: 1,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewVendorProfile />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Edit'));

    expect(screen.getByLabelText(/Vendor Shop Name/i)).toHaveValue('Test Shop');
    expect(screen.getByLabelText(/House No and Floor/i)).toHaveValue('123');
    expect(screen.getByLabelText(/Building and Block No/i)).toHaveValue('Block A');
    expect(screen.getByLabelText(/Pincode/i)).toHaveValue('123456');
    expect(screen.getByLabelText(/Landmark and Area Name/i)).toHaveValue('Near Park');
  });

 

});