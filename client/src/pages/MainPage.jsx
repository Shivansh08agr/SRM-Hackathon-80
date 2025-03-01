import React, { useState, useEffect } from 'react';
import Sidebar from '../components/loadingScreen/Sidebar';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [activeSection, setActiveSection] = useState('items');
  const navigate = useNavigate();

  useEffect(() => {
    renderContent();
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'items':
        navigate("/shopkeeper/placeorder/items");
        break;
      case 'Orders and Payments log':
        navigate("/shopkeeper/ordersandpaymentlog");
        break;
      case 'Suggestions':
        navigate("/shopkeeper/placeorder/suggestions");
        break;
      case 'Add Inventory':
        navigate("/shopkeeper/placeorder/addinventory");
        break;
      default:
        navigate("/shopkeeper/placeorder/items");
        break;
    }
  };

  return (
    <div className="main-page">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="content">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="body-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MainPage;