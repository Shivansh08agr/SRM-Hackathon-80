import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderDetails.css';

const orderDetailsData = {
  shopkeeper: 'Shopkeeper 1',
  items: [
    { name: 'Item 1', quantity: 2, price: 100 },
    { name: 'Item 2', quantity: 1, price: 200 },
    { name: 'Item 3', quantity: 3, price: 150 },
  ],
  total: 850,
  shopkeeperDetails: {
    name: 'Shopkeeper 1',
    address: '123 Main St, City, Country',
    phone: '123-456-7890',
  },
};

const OrderDetails = () => {
  const [orderAccepted, setOrderAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const shopkeeper = new URLSearchParams(location.search).get('shopkeeper');

  const handleAcceptOrder = () => {
    setOrderAccepted(true);
  };

  const handleRejectOrder = () => {
    alert('Order has been rejected.');
    navigate('/company/vieworders');
  };

  return (
    <div className="order-details-container">
      <h2>Order Details for {shopkeeper}</h2>
      <table className="order-details-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetailsData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Amount</td>
            <td>₹{orderDetailsData.total}</td>
          </tr>
        </tfoot>
      </table>
      {!orderAccepted ? (
        <div className="order-actions">
          <button className="accept-order-button" onClick={handleAcceptOrder}>
            Accept Order
          </button>
          <button className="reject-order-button" onClick={handleRejectOrder}>
            Reject Order
          </button>
        </div>
      ) : (
        <div className="shopkeeper-details">
          <h3>Shopkeeper Details</h3>
          <p>Name: {orderDetailsData.shopkeeperDetails.name}</p>
          <p>Address: {orderDetailsData.shopkeeperDetails.address}</p>
          <p>Phone: {orderDetailsData.shopkeeperDetails.phone}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;