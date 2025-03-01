import React from 'react';
import './IndividualOrders.css';
import Sidebar from '../../../../components/loadingScreen/Sidebar';

const IndividualOrders = () => {
  const orderData = {
    time: '10:00 AM',
    items: [
      { name: 'Dove', quantity: 2, price: 20 },
      { name: 'Lentils', quantity: 1, price: 50 },
      { name: 'Lux', quantity: 3, price: 15 },
    ],
  };

  const orderTotal = orderData.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="main-page">
      <Sidebar />
    <div className="individual-orders-container">
      <h2>Individual Order</h2>
      <p>Time: {orderData.time}</p>
      <table className="individual-orders-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderData.items.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>₹{orderTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    </div>

  );
};

export default IndividualOrders;