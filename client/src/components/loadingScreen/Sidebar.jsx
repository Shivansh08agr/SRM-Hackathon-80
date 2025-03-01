import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section) => {
    navigate(`/shopkeeper/${section}`)
    toggleSidebar(); // Close the sidebar on mobile after clicking
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Burger Menu Icon */}
      <div className="burger-menu" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar Options */}
      <div className="sidebar-options">
        <div className="sidebar-item" onClick={() => handleSectionClick('placeorder/items')}>
          Items
        </div>
        <div className="sidebar-item" onClick={() => handleSectionClick('ordersandpaymentlog')}>
          Orders and Payments log
        </div>
        <div className="sidebar-item" onClick={() => handleSectionClick('suggestions')}>
          Suggestions
        </div>
        <div className="sidebar-item" onClick={() => handleSectionClick('addinventory')}>
          Add Inventory
        </div>
      </div>
    </div>
  );
};

export default Sidebar;