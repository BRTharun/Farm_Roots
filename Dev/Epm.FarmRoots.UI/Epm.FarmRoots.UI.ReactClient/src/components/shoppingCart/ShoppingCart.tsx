
import React, { useState } from 'react';
import './shoppingCart.css';
import AddToCartButton from './AddToCartButton';
import Banana from '../../assets/shoppingCartImages/banana.jpg';

import Onion from '../../assets/shoppingCartImages/onion.jpg';
import Apple from '../../assets/shoppingCartImages/Apple.jpg';
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

const imageMap: { [key: string]: string } = {
  'banana robusta': Banana,
  'onion': Onion,
  'apple royal gala': Apple,
};

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([
    { id: 1, name: 'Banana Robusta', price: 44, originalPrice: 89, quantity: 1 },
    { id: 2, name: 'Onion', price: 53, originalPrice: 72, quantity: 1 },
    { id: 3, name: 'Apple Royal Gala', price: 203, originalPrice: 253, quantity: 1 },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(true);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      deleteProduct(id); // Remove product if quantity is 0
    } else {
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === id
            ? { ...product, quantity: Math.min(newQuantity, 6) }
            : product
        )
      );
    }
  };

  const deleteProduct = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const totalSavings = cart.reduce(
    (acc, product) => acc + (product.originalPrice - product.price) * product.quantity,
    0
  );

  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const toggleCart = () => setIsCartOpen(!isCartOpen); // Toggle cart visibility

  if (!isCartOpen) return null; // Render nothing if cart is closed

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-cart-button" onClick={toggleCart}>
          &larr; {/* Arrow symbol */}
        </button>
      </div>
      <div className="delivery-info">Delivery in 7 mins</div>

      {cart.map((product) => (
        <div key={product.id} className="cart-item">
          <img src={imageMap[product.name.toLowerCase()]} alt={product.name} />
          <div className="cart-item-details">
            <span>{product.name}</span>
            <span>₹{product.price}</span>
          </div>
          <div className="cart-item-buttons">
            <AddToCartButton
              quantity={product.quantity}
              onQuantityChange={(newQuantity: number) => handleQuantityChange(product.id, newQuantity)}
            />
            <button onClick={() => deleteProduct(product.id)}>🗑️</button>
          </div>
          <span>Total: ₹{product.price * product.quantity}</span>
        </div>
      ))}

      <div className="cart-summary">
        <h3>Total Price: <span>₹{totalPrice}</span></h3>
        <h3>Total Savings: <span>₹{totalSavings}</span></h3>
      </div>

      <div className="bill-summary">
        <h4>Bill Summary</h4>
        <div className="bill-item">
          <span>Item Total & GST:</span>
          <span>₹{totalPrice + 10}</span>
        </div>
        <div className="bill-item">
          <span>Handling Charge:</span>
          <span>₹5.49</span>
        </div>
        <div className="bill-item">
          <span>Delivery Fee:</span>
          <span>Free with Pass</span>
        </div>
        <div className="bill-item">
          <span>Zepto Pass Membership:</span>
          <span>₹1</span>
        </div>
      </div>

      <button className="proceed-button">Add Address to Proceed</button>
    </div>
  );
};

export default ShoppingCart;
