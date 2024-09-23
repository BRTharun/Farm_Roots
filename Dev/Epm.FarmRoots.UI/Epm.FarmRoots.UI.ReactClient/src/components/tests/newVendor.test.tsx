import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchVendorProfile,
  fetchVendorAddress,
  addVendorAddress,
  updateVendorProfile,
  updateVendorAddress,
  default as vendorReducer,
  VendorState,
} from '../utils/slices/newVendor';

// Initialize Axios Mock Adapter
const mock = new MockAdapter(axios);

describe('vendorSlice', () => {
  let initialState: VendorState;

  beforeEach(() => {
    initialState = {
      vendor: null,
      address: null,
      loading: false,
      profile: null,
      error: null,
    };

    // Reset mock adapter before every test
    mock.reset();
  });

  it('should handle fetchVendorProfile fulfilled', async () => {
    const vendorProfile = {
      id: 1,
      name: 'Vendor Name',
      email: 'vendor@example.com',
      phoneNumber: '1234567890',
      password: 'securePassword',
    };

    mock.onGet('https://localhost:7116/api/Vendor/1').reply(200, vendorProfile);

    const action = fetchVendorProfile.fulfilled(vendorProfile, '', { vendorId: 1 });
    const state = vendorReducer(initialState, action);

    expect(state.profile).toEqual(vendorProfile);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchVendorAddress fulfilled', async () => {
    const addresses = 
      {
        vendorAddressId: 1,
        vendorShopName: 'Shop 1',
        houseNoAndFloor: 'No.1',
        buildingAndBlockNo: 'Block A',
        pincode: '12345',
        landmarkAndAreaName: 'Landmark 1',
        vendorId: 1,
      }
    ;

    mock.onGet('https://localhost:7116/api/Vendor/1/GetAddresses').reply(200, addresses);

    const action = fetchVendorAddress.fulfilled(addresses, '', { vendorId: 1 });
    const state = vendorReducer(initialState, action);

    expect(state.address).toEqual(addresses);
    expect(state.loading).toBe(false);
  });

  it('should handle addVendorAddress fulfilled', async () => {
    const newAddress = {
      vendorAddressId: 2,
      vendorShopName: 'Shop 2',
      houseNoAndFloor: 'No.2',
      buildingAndBlockNo: 'Block B',
      pincode: '67890',
      landmarkAndAreaName: 'Landmark 2',
      vendorId: 1,
    };

    mock.onPost('https://localhost:7116/api/Vendor/vendors/1/AddAddresses').reply(200, newAddress);

    const action = addVendorAddress.fulfilled([newAddress], '', { vendorId: 1, addressData: newAddress });
    const state = vendorReducer(initialState, action);

    expect(state.address).toContainEqual(newAddress);
    expect(state.loading).toBe(false);
  });

  it('should handle updateVendorProfile fulfilled', async () => {
    const updatedProfile = {
      id: 1,
      name: 'Updated Vendor Name',
      email: 'updatedemail@example.com',
      phoneNumber: '0987654321',
      password: 'newSecurePassword',
    };

    const profileData = { name: 'Updated Vendor Name' };

    mock.onPut('https://localhost:7116/api/Customer/UpdateCustomer/1').reply(200, updatedProfile);

    const action = updateVendorProfile.fulfilled(updatedProfile, '', { vendorId: 1, profileData });
    const state = vendorReducer(initialState, action);

    expect(state.profile).toEqual(updatedProfile);
  });

  it('should handle updateVendorAddress fulfilled', async () => {
    const updatedAddress = {
      vendorAddressId: 1,
      vendorShopName: 'Updated Shop',
      houseNoAndFloor: 'No.1',
      buildingAndBlockNo: 'Block A',
      pincode: '99999',
      landmarkAndAreaName: 'Updated Landmark',
      vendorId: 1,
    };

    mock.onPut('https://localhost:7116/api/Vendor/1/addresses/1').reply(200, updatedAddress);

    const action = updateVendorAddress.fulfilled([updatedAddress], '', { vendorId: 1, addressId: 1, addressData: {} });
    const state = vendorReducer(initialState, action);

    expect(state.address).toEqual([updatedAddress]);
  });

  it('should handle fetchVendorProfile rejected', () => {
    const action = fetchVendorProfile.rejected(
      new Error('Failed to fetch profile'),
      '',
      { vendorId: 1 }
    );
    const state = vendorReducer(initialState, action);

    expect(state.error).toEqual('Failed to fetch profile');
    expect(state.loading).toBe(false);
  });

  it('should handle fetchVendorAddress rejected', () => {
    const action = fetchVendorAddress.rejected(
      new Error('Failed to fetch address'),
      '',
      { vendorId: 1 }
    );
    const state = vendorReducer(initialState, action);

    expect(state.error).toEqual('Failed to fetch address');
    expect(state.loading).toBe(false);
  });

  it('should handle addVendorAddress rejected', () => {
    const action = addVendorAddress.rejected(
      new Error('Failed to add address'),
      '',
      {
        vendorId: 1,
        addressData: {
          vendorAddressId: 0,
          vendorShopName: '',
          houseNoAndFloor: '',
          buildingAndBlockNo: '',
          pincode: '',
          landmarkAndAreaName: '',
          vendorId: 0
        },
      }
    );
    const state = vendorReducer(initialState, action);

    expect(state.error).toEqual('Failed to add address');
  });

  it('should handle updateVendorProfile rejected', () => {
    const action = updateVendorProfile.rejected(
      new Error('Failed to update profile'),
      '',
      { vendorId: 1, profileData: {} }
    );
    const state = vendorReducer(initialState, action);

    expect(state.error).toEqual('Failed to update profile');
  });

  it('should handle updateVendorAddress rejected', () => {
    const action = updateVendorAddress.rejected(
      new Error('Failed to update address'),
      '',
      { vendorId: 1, addressId: 1, addressData: {} }
    );
    const state = vendorReducer(initialState, action);

    expect(state.error).toEqual('Failed to update address');
  });
});