import React, { useState, ChangeEvent } from 'react';

interface AddToCartButtonProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ quantity, onQuantityChange }) => {
  const [inputValue, setInputValue] = useState(quantity);

  const incrementQuantity = () => {
    if (quantity < 6) {
      const newQuantity = quantity + 1;
      setInputValue(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setInputValue(newQuantity);
      onQuantityChange(newQuantity);
    }
  };
 
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newQuantity = Math.max(Number(value) || 0, 0); // Ensure it's a non-negative number
    setInputValue(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={decrementQuantity} style={{ marginRight: '5px' }} disabled={quantity <= 0}>
        -
      </button>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min="0"
        step="1"
        style={{
          width: '40px',
          textAlign: 'center',
          margin: '0 5px',
          padding: '5px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      />
      <button onClick={incrementQuantity} style={{ marginLeft: '5px' }} disabled={quantity >= 6}>
        +
      </button>
       
    </div>
  );
};

export default AddToCartButton;
