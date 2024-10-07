import { render, screen } from "@testing-library/react";
import HowItWorks from "../components/pages/products/HowItWorks";
import openApp from "../assets/HowItWorks/open-app.svg";
import placeOrder from "../assets/HowItWorks/place-order.svg";
import freeDelivery from "../assets/HowItWorks/open-app.svg";

describe('HowItWorks Component', () => {
  test('renders the correct number of steps', () => {
    render(<HowItWorks />);
    
    // Check if all three headings (steps) are present
    expect(screen.getByText('Open the app')).toBeInTheDocument();
    expect(screen.getByText('Place an order')).toBeInTheDocument();
    expect(screen.getByText('Get free delivery')).toBeInTheDocument();
  });

  test('renders images correctly', () => {
    render(<HowItWorks />);
    
    // Check if all images are rendered correctly
    const openAppImage = screen.getByAltText('Open App');
    const placeOrderImage = screen.getByAltText('Place Order');
    const freeDeliveryImage = screen.getByAltText('Free Delivery');

    expect(openAppImage).toHaveAttribute('src', openApp);
    expect(placeOrderImage).toHaveAttribute('src', placeOrder);
    expect(freeDeliveryImage).toHaveAttribute('src', freeDelivery);
  });

  test('renders correct descriptions', () => {
    render(<HowItWorks />);
    
    // Check descriptions for each step
    expect(screen.getByText(/Choose from over 7000 products/)).toBeInTheDocument();
    expect(screen.getByText(/Add your favourite items to the cart/)).toBeInTheDocument();
    expect(screen.getByText(/Experience lightning-fast speed/)).toBeInTheDocument();
  });
});
