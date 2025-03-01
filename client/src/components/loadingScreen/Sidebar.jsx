import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
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
        <div className="sidebar-item" onClick={() => handleSectionClick('section1')}>
          Section 1
        </div>
        <div className="sidebar-item" onClick={() => handleSectionClick('section2')}>
          Section 2
        </div>
        <div className="sidebar-item" onClick={() => handleSectionClick('section3')}>
          Section 3
        </div>
        <div className="sidebar-item" onClick={() => handleSectionClick('section4')}>
          Section 4
        </div>
      </div>
    </div>
  );
};

export default Sidebar;