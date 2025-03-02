import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Items.css';
import Sidebar from '../../../../components/loadingScreen/Sidebar';

const items = {
  soaps: [
    { name: 'Dove', price: 20 },
    { name: 'Lux', price: 15 },
    { name: 'Pears', price: 25 },
    { name: 'Liril', price: 18 },
    { name: 'Cinthol', price: 22 },
  ],
  pulses: [
    { name: 'Lentils', price: 50 },
    { name: 'Chickpeas', price: 60 },
    { name: 'Kidney Beans', price: 70 },
    { name: 'Black Beans', price: 65 },
    { name: 'Green Gram', price: 55 },
  ],
  snacks: [
    { name: 'Lays', price: 10 },
    { name: 'KurKure', price: 15 },
    { name: 'Bingo', price: 20 },
    { name: 'Uncle Chips', price: 18 },
    { name: 'Pringles', price: 50 },
  ],
  beverages: [
    { name: 'Coke', price: 30 },
    { name: 'Pepsi', price: 30 },
    { name: 'Sprite', price: 28 },
    { name: 'Fanta', price: 28 },
    { name: 'Mountain Dew', price: 32 },
  ],
  dairy: [
    { name: 'Milk', price: 40 },
    { name: 'Cheese', price: 80 },
    { name: 'Butter', price: 60 },
    { name: 'Yogurt', price: 50 },
    { name: 'Paneer', price: 70 },
  ],
  fruits: [
    { name: 'Apple', price: 100 },
    { name: 'Banana', price: 40 },
    { name: 'Orange', price: 60 },
    { name: 'Grapes', price: 80 },
    { name: 'Mango', price: 120 },
  ],
  vegetables: [
    { name: 'Potato', price: 30 },
    { name: 'Tomato', price: 40 },
    { name: 'Onion', price: 35 },
    { name: 'Carrot', price: 50 },
    { name: 'Spinach', price: 25 },
  ],
  grains: [
    { name: 'Rice', price: 60 },
    { name: 'Wheat', price: 50 },
    { name: 'Barley', price: 55 },
    { name: 'Oats', price: 70 },
    { name: 'Quinoa', price: 90 },
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
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredItems = Object.keys(items).reduce((acc, category) => {
    const filteredCategoryItems = items[category].filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (category.toLowerCase().includes(searchQuery.toLowerCase()) || filteredCategoryItems.length > 0) {
      acc[category] = filteredCategoryItems;
    }
    return acc;
  }, {});

  return (
    <div className="main-page">
      <Sidebar />
      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="items-container">
          <div className="categories">
            {Object.keys(filteredItems).map((category) => (
              <div key={category} className="category">
                <div className="category-header">
                  <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                  <button onClick={() => toggleCategoryCollapse(category)}>
                    {collapsedCategories[category] ? 'Expand' : 'Collapse'}
                  </button>
                </div>
                {!collapsedCategories[category] && (
                  <div className="seperator">
                    {filteredItems[category].map((item) => (
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
                            <button onClick={() => handleQuantityChange(category, item, -1)}>-</button>
                            <span>{selectedItems[`${category}-${item.name}`].quantity}</span>
                            <button onClick={() => handleQuantityChange(category, item, 1)}>+</button>
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
      </div>
    </div>
  );
};

export default Items;