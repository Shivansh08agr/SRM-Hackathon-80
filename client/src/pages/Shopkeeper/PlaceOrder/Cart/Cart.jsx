import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();

  const selectedItems = {
    'soaps-Dove': { name: 'Dove', price: 20, quantity: 2 },
    'pulses-Lentils': { name: 'Lentils', price: 50, quantity: 1 },
    'soaps-Lux': { name: 'Lux', price: 15, quantity: 3 },
    'soaps-Dove1': { name: 'Dove', price: 20, quantity: 2 },
    'pulses-Lentils1': { name: 'Lentils', price: 50, quantity: 1 },
    'soaps-Lux1': { name: 'Lux', price: 15, quantity: 3 },
  };

  const totalPrice = Object.keys(selectedItems).reduce((total, key) => {
    const item = selectedItems[key];
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    alert('Proceeding to checkout');
    navigate('/shopkeeper/placeorder/items');
  };

  const handleCancel = () => {
    alert('Cancelling order');
    navigate('/shopkeeper/placeorder/items');
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedItems).map((key) => {
            const item = selectedItems[key];
            return (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Price</td>
            <td>₹{totalPrice}</td>
          </tr>
        </tfoot>
      </table>
      <div className='buttons'>
        <button className="cancel-button" onClick={handleCancel}>
          CANCEL
        </button>
        <button className="paid-button" onClick={handleCheckout}>
          PAID
        </button>
      </div>
    </div>
  );
};

export default Cart;