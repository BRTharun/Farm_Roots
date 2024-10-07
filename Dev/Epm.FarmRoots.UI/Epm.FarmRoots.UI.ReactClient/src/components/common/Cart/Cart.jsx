import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CartItem Component
const CartItem = ({ name, price, currency, onClick }) => {
  return (
    <div className="flex p-4 gap-4 border-t border-gray-300"> {/* Updated with Tailwind classes */}
      <div className="flex items-center">
        <button
          className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded"
          onClick={onClick}
        >
          X
        </button>
        <span className="ml-2 text-[15px] font-bold">{name}</span> {/* Name style updated */}
      </div>
      <div className="text-[15px] font-bold text-black">
        {price} {currency}
      </div>
    </div>
  );
};

// Cart Component
const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 150, currency: '₹' },
    { id: 2, name: 'Banana', price: 80, currency: '₹' },
    { id: 3, name: 'Orange', price: 200, currency: '₹' },
  ]);

  const total = items.reduce((acc, item) => acc + item.price, 0);
  const currency = '₹';
  const navigate = useNavigate(); // React Router hook for navigation

  const removeFromCart = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-4">Shopping Cart</h3>
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        {items.length > 0 ? (
          <div className="mb-3">
            {items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                currency={item.currency}
                onClick={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-3">
            Cart is empty
          </div>
        )}
        <div className="text-right font-bold text-xl leading-tight">
          Total: {total} {currency}
        </div>
      </div>
    </div>
  );
};

export default Cart;
