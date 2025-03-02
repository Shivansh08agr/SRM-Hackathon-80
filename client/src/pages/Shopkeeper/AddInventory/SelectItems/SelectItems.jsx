import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SelectItems.css';

const itemsData = {
  'Company A': [
    { name: 'Item 1', price: 100 },
    { name: 'Item 2', price: 200 },
  ],
  'Company B': [
    { name: 'Item 3', price: 150 },
    { name: 'Item 4', price: 250 },
  ],
  // Add more companies and items as needed
};

const SelectItems = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const company = new URLSearchParams(location.search).get('company');

  const handleQuantityChange = (item, quantity) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [item.name]: { ...item, quantity: parseInt(quantity) },
    }));
  };

  const handlePlaceOrder = () => {
    navigate('/shopkeeper/addinventory/placeorder', { state: { selectedItems } });
  };

  return (
    <div className="select-items-container">
      <h2>Select Items from {company}</h2>
      <div className="items-list">
        {itemsData[company].map((item) => (
          <div key={item.name} className="item">
            <span>{item.name} - ₹{item.price}</span>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              onChange={(e) => handleQuantityChange(item, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default SelectItems;