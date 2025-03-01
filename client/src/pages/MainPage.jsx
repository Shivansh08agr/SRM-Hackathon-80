import React, { useState } from 'react';
import Sidebar from '../components/loadingScreen/Sidebar';
import './MainPage.css';

const MainPage = () => {
  const [activeSection, setActiveSection] = useState('section1');

  const renderContent = () => {
    switch (activeSection) {
      case 'section1':
        return <div>Content for Section 1</div>;
      case 'section2':
        return <div>Content for Section 2</div>;
      case 'section3':
        return <div>Content for Section 3</div>;
      case 'section4':
        return <div>Content for Section 4</div>;
      default:
        return <div>Select a section</div>;
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