import React, { useState } from 'react';
import './Items.css';
import { useNavigate } from 'react-router-dom';

const items = {
  soaps: [
    { name: 'Dove', price: 20 },
    { name: 'Lux', price: 15 },
    { name: 'Pears', price: 25 },
  ],
  pulses: [
    { name: 'Lentils', price: 50 },
    { name: 'Chickpeas', price: 60 },
    { name: 'Kidney Beans', price: 70 },
  ],
  soaps1: [
    { name: 'Dove', price: 20 },
    { name: 'Lux', price: 15 },
    { name: 'Pears', price: 25 },
  ],
  pulses1: [
    { name: 'Lentils', price: 50 },
    { name: 'Chickpeas', price: 60 },
    { name: 'Kidney Beans', price: 70 },
  ],
  soaps2: [
    { name: 'Dove', price: 20 },
    { name: 'Lux', price: 15 },
    { name: 'Pears', price: 25 },
  ],
  pulses2: [
    { name: 'Lentils', price: 50 },
    { name: 'Chickpeas', price: 60 },
    { name: 'Kidney Beans', price: 70 },
  ],
};

const Items = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [collapsedCategories, setCollapsedCategories] = useState(
    Object.keys(items).reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {})
  );

  const navigate = useNavigate();

  const handleCheckboxChange = (category, item) => {
    const itemIdentifier = `${category}-${item.name}`;
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };
      if (newSelectedItems[itemIdentifier]) {
        delete newSelectedItems[itemIdentifier];
      } else {
        newSelectedItems[itemIdentifier] = { ...item, quantity: 1 };
      }
      return newSelectedItems;
    });
  };

  const handleQuantityChange = (category, item, delta) => {
    const itemIdentifier = `${category}-${item.name}`;
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };
      if (newSelectedItems[itemIdentifier]) {
        newSelectedItems[itemIdentifier].quantity += delta;
        if (newSelectedItems[itemIdentifier].quantity <= 0) {
          delete newSelectedItems[itemIdentifier];
        }
      }
      return newSelectedItems;
    });
  };

  const handleAddToCart = () => {
    const cartItems = Object.keys(selectedItems).map((key) => {
      const item = selectedItems[key];
      return `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`;
    });
    alert(`Items added to cart: ${cartItems.join(', ')}`);
    navigate('/shopkeeper/placeorder/cart');
  };

  const toggleCategoryCollapse = (category) => {
    setCollapsedCategories((prevCollapsedCategories) => ({
      ...prevCollapsedCategories,
      [category]: !prevCollapsedCategories[category],
    }));
  };

  return (
    <div className="items-container">
      <div className='categories'>
        {Object.keys(items).map((category) => (
          <div key={category} className="category">
            <div className="category-header">
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <button onClick={() => toggleCategoryCollapse(category)}>
                {collapsedCategories[category] ? 'Expand' : 'Collapse'}
              </button>
            </div>
            {!collapsedCategories[category] && (
              <div className="seperator">
                {items[category].map((item) => (
                  <div key={item.name} className="item">
                    <input
                      type="checkbox"
                      id={`${category}-${item.name}`}
                      onChange={() => handleCheckboxChange(category, item)}
                      checked={!!selectedItems[`${category}-${item.name}`]}
                    />
                    <label htmlFor={`${category}-${item.name}`}>
                      {item.name} - ₹{item.price}
                    </label>
                    {selectedItems[`${category}-${item.name}`] && (
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(category, item, -0.5)}>-</button>
                        <span>{selectedItems[`${category}-${item.name}`].quantity}</span>
                        <button onClick={() => handleQuantityChange(category, item, 0.5)}>+</button>
                        <span>Total: ₹{selectedItems[`${category}-${item.name}`].quantity * item.price}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Items;