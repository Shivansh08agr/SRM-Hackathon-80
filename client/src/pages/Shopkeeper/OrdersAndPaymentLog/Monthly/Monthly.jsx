import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Monthly.css';
import Sidebar from '../../../../components/loadingScreen/Sidebar';

const Monthly = () => {
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    // Handle date change logic here
    console.log(event.target.value);
  };

  const monthlyData = [
    { date: '2025-03-01', total: 500 },
    { date: '2025-03-02', total: 300 },
    { date: '2025-03-03', total: 700 },
  ];

  const monthlyTotal = monthlyData.reduce((total, day) => total + day.total, 0);

  const handleRowClick = (date) => {
    navigate(`/shopkeeper/ordersandpaymentlog/daily?date=${date}`);
  };

  return (
    <div className="main-page">
      <Sidebar />
    <div className="monthly-container">
      <h2>Monthly Orders and Payments Log</h2>
      <input type="month" onChange={handleDateChange} />
      <table className="monthly-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Payments</th>
          </tr>
        </thead>
        <tbody>
          {monthlyData.map((day) => (
            <tr key={day.date} onClick={() => handleRowClick(day.date)}>
              <td>{day.date}</td>
              <td>₹{day.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>₹{monthlyTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    </div>
  );
};

export default Monthly;