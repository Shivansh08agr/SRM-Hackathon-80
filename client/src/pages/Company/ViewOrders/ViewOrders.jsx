import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewOrders.css';

const ordersData = [
  { shopkeeper: 'Shopkeeper 1', date: '2025-03-01', total: 500 },
  { shopkeeper: 'Shopkeeper 2', date: '2025-03-02', total: 300 },
  { shopkeeper: 'Shopkeeper 3', date: '2025-03-03', total: 700 },
];

const ViewOrders = () => {
  const navigate = useNavigate();

  const handleOrderClick = (shopkeeper) => {
    navigate(`/company/orderdetails?shopkeeper=${shopkeeper}`);
  };

  return (
    <div className="view-orders-container">
      <h2>View Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Shopkeeper</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order, index) => (
            <tr key={index} onClick={() => handleOrderClick(order.shopkeeper)}>
              <td>{order.shopkeeper}</td>
              <td>{order.date}</td>
              <td>₹{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;