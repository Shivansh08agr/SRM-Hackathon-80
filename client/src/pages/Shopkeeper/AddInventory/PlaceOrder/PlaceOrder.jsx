import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state.selectedItems;

  const totalAmount = Object.values(selectedItems).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSendOrderRequest = () => {
    alert("Your order request has been sent to the company and they'll process it shortly and get back to you");
    navigate('/shopkeeper/placeorder/items');
  };

  return (
    <div className="place-order-container">
      <h2>Order Summary</h2>
      <table className="order-summary-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(selectedItems).map((item) => (
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
            <td colSpan="3">Total Amount</td>
            <td>₹{totalAmount}</td>
          </tr>
        </tfoot>
      </table>
      <button className="send-order-button" onClick={handleSendOrderRequest}>
        Send Order Request
      </button>
    </div>
  );
};

export default PlaceOrder;