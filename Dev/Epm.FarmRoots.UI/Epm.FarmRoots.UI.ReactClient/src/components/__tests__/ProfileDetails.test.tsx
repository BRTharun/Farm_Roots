import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileDetails from '../components/pages/profile/ProfileDetails';
import axios from 'axios';

jest.mock('axios');

describe('ProfileDetails', () => {
  const mockUserDetails = {
    customerId: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [mockUserDetails] });
    
    window.alert = jest.fn();
    window.confirm = jest.fn().mockReturnValue(true); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<ProfileDetails />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders user details after fetching', async () => {
    render(<ProfileDetails />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name*/i)).toHaveValue(mockUserDetails.name);
      expect(screen.getByLabelText(/Email Address*/i)).toHaveValue(mockUserDetails.email);
    });
  });

  it('validates name input', async () => {
    render(<ProfileDetails />);

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/Name*/i);
      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      fireEvent.blur(nameInput);
      expect(screen.queryByText(/Name must start with a letter/i)).not.toBeInTheDocument();

      fireEvent.change(nameInput, { target: { value: '123' } });
      fireEvent.blur(nameInput);
      expect(screen.getByText(/Name must start with a letter, contain only letters and spaces, and be less than 30 characters/i)).toBeInTheDocument();
    });
  });

  it('validates email input', async () => {
    render(<ProfileDetails />);

    await waitFor(() => {
      const emailInput = screen.getByLabelText(/Email Address*/i);
      
      fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
      fireEvent.blur(emailInput);
      expect(screen.queryByText(/Invalid email format/i)).not.toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    render(<ProfileDetails />);
    
    await waitFor(async () => {
      const nameInput = screen.getByLabelText(/Name*/i);
      const emailInput = screen.getByLabelText(/Email Address*/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
      (axios.put as jest.Mock).mockResolvedValue({});
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Profile updated successfully!");
      });
    });
  });

  it('handles API errors during submit', async () => {
    render(<ProfileDetails />);
    await waitFor(async () => {
      const nameInput = screen.getByLabelText(/Name*/i);
      const emailInput = screen.getByLabelText(/Email Address*/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });

      (axios.put as jest.Mock).mockRejectedValue(new Error("Network Error"));

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Failed to update profile.");
      });
    });
  });
});

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ProfileDetails from '../components/pages/profile/ProfileDetails';
// import axios from 'axios';

// jest.mock('axios');

// describe('ProfileDetails', () => {
//   const mockUserDetails = {
//     customerId: 1,
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phoneNumber: '1234567890',
//   };

//   beforeEach(() => {
//     (axios.get as jest.Mock).mockResolvedValue({ data: [mockUserDetails] });
    
//     window.alert = jest.fn();
//     window.confirm = jest.fn().mockReturnValue(true); 
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders loading state initially', () => {
//     render(<ProfileDetails />);
//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
//   });

//   it('renders user details after fetching', async () => {
//     render(<ProfileDetails />);

//     await waitFor(() => {
//       expect(screen.getByLabelText(/Name*/i)).toHaveValue(mockUserDetails.name);
//       expect(screen.getByLabelText(/Email Address*/i)).toHaveValue(mockUserDetails.email);
//     });
//   });

//   it('validates name input', async () => {
//     render(<ProfileDetails />);

//     await waitFor(() => {
//       const nameInput = screen.getByLabelText(/Name*/i);
//       fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
//       fireEvent.blur(nameInput);
//       expect(screen.queryByText(/Name must start with a letter/i)).not.toBeInTheDocument();

//       fireEvent.change(nameInput, { target: { value: '' } });
//       fireEvent.blur(nameInput);
//       expect(screen.getByText(/Name must start with a letter, contain only letters and spaces, and be less than 30 characters/i)).not.toBeInTheDocument();
//       expect(screen.getByText(/Required/i)).toBeInTheDocument();
//     });
//   });

//   it('validates email input', async () => {
//     render(<ProfileDetails />);

//     await waitFor(() => {
//       const emailInput = screen.getByLabelText(/Email Address*/i);
      
//       fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
//       fireEvent.blur(emailInput);
//       expect(screen.queryByText(/Invalid email format/i)).not.toBeInTheDocument();

//       fireEvent.change(emailInput, { target: { value: '' } });
//       fireEvent.blur(emailInput);
//       expect(screen.getByText(/Required/i)).toBeInTheDocument();
//     });
//   });

//   it('submits form successfully', async () => {
//     render(<ProfileDetails />);
    
//     await waitFor(async () => {
//       const nameInput = screen.getByLabelText(/Name*/i);
//       const emailInput = screen.getByLabelText(/Email Address*/i);
//       const submitButton = screen.getByRole('button', { name: /Submit/i });

//       fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
//       fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
//       (axios.put as jest.Mock).mockResolvedValue({});
//       fireEvent.click(submitButton);
//       await waitFor(() => {
//         expect(window.alert).toHaveBeenCalledWith("Profile updated successfully!");
//       });
//     });
//   });

//   it('handles API errors during submit', async () => {
//     render(<ProfileDetails />);
//     await waitFor(async () => {
//       const nameInput = screen.getByLabelText(/Name*/i);
//       const emailInput = screen.getByLabelText(/Email Address*/i);
//       const submitButton = screen.getByRole('button', { name: /Submit/i });

//       fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
//       fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });

//       (axios.put as jest.Mock).mockRejectedValue(new Error("Network Error"));

//       fireEvent.click(submitButton);

//       await waitFor(() => {
//         expect(window.alert).toHaveBeenCalledWith("Failed to update profile.");
//       });
//     });
//   });

//   it('handles API errors during fetching user details', async () => {
//     (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

//     render(<ProfileDetails />);

//     await waitFor(() => {
//       expect(window.alert).toHaveBeenCalledWith("Failed to load user details.");
//     });
//   });
// });
