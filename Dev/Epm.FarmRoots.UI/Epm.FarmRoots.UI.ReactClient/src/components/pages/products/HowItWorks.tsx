import React from "react";
import openApp from "../../../assets/HowItWorks/open-app.svg";
import placeOrder from "../../../assets/HowItWorks/place-order.svg";
import freeDelivery from "../../../assets/HowItWorks/open-app.svg";
import '../../../assets/styles/HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <div className="how-it-works-container">
      <h3>How it Works</h3>
      <div className="image-description-container">
        <img src={openApp} alt="Open App" className="image" />
        <div className="description-container">
          <h4>Open the app</h4>
          <p>
            Choose from over 7000 products across groceries, fresh fruits &
            veggies, meat, pet care, beauty items & more
          </p>
        </div>
      </div>
      <div className="image-description-container">
        <img src={placeOrder} alt="Place Order" className="image" />
        <div className="description-container">
          <h4>Place an order</h4>
          <p>Add your favourite items to the cart & avail the best offers</p>
        </div>
      </div>
      <div className="image-description-container">
        <img src={freeDelivery} alt="Free Delivery" className="image" />
        <div className="description-container">
          <h4>Get free delivery</h4>
          <p>Experience lightning-fast speed & get all your items delivered in 10 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
