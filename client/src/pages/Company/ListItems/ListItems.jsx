import React, { useState } from 'react';
import './ListItems.css';

const initialItems = [
  { name: 'Item 1', price: 100 },
  { name: 'Item 2', price: 200 },
  { name: 'Item 3', price: 150 },
  { name: 'Item 4', price: 250 },
];

const ListItems = () => {
  const [items, setItems] = useState(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      const newItem = { name: newItemName, price: parseFloat(newItemPrice) };
      setItems([...items, newItem]);
      setNewItemName('');
      setNewItemPrice('');
    } else {
      alert('Please enter both item name and price.');
    }
  };

  return (
    <div className="list-items-container">
      <h2>List of Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Item Price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
        />
        <button className="add-item-button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
    </div>
  );
};

export default ListItems;