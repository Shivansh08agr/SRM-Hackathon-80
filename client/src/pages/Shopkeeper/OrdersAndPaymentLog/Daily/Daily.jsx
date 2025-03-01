import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Daily.css';
import Sidebar from '../../../../components/loadingScreen/Sidebar';

const Daily = () => {
  const navigate = useNavigate();

  const dailyData = [
    { time: '10:00 AM', total: 200 },
    { time: '11:30 AM', total: 100 },
    { time: '01:15 PM', total: 150 },
  ];

  const dailyTotal = dailyData.reduce((total, order) => total + order.total, 0);

  const handleRowClick = (time) => {
    navigate(`/shopkeeper/ordersandpaymentlog/individual?time=${time}`);
  };

  return (
    <div className="main-page">
      <Sidebar />
    <div className="daily-container">
      <h2>Daily Orders and Payments Log</h2>
      <table className="daily-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Total Payments</th>
          </tr>
        </thead>
        <tbody>
          {dailyData.map((order) => (
            <tr key={order.time} onClick={() => handleRowClick(order.time)}>
              <td>{order.time}</td>
              <td>₹{order.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>₹{dailyTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    </div>
  );
};

export default Daily;