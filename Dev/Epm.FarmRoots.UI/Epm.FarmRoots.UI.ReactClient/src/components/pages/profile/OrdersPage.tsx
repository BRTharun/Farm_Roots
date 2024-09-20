import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import emptyOrderBag from '../../../assets/images/orders/empty-bag.avif';
import '../../../assets/styles/OrdersPage.css'; 

const OrdersPage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/'); 
  };

  return (
    <div className="no-orders-found-container">
      <img src={emptyOrderBag} alt="No Orders" className="no-orders-image" />
      <p className="description">No orders yet</p>
      <button onClick={handleClick} className="link">
        Browse Products
      </button>
    </div>
  );
};

export default OrdersPage;
