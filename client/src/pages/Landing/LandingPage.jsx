import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Redirect to login page with role as state
    navigate('/login', { state: { selectedRole: role } });
  };

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1>Welcome to Our Platform</h1>
        <h2>Your One-Stop Solution for Business Management</h2>
      </div>

      <div className="role-section">
        <h2>Please select your role:</h2>
        <div className="role-selection">
          <div 
            className={`role-card ${selectedRole === 'company' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('company')}
          >
            <h3>Company</h3>
            <p>Manage your products and distribution</p>
          </div>
          
          <div 
            className={`role-card ${selectedRole === 'shopkeeper' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('shopkeeper')}
          >
            <h3>Shopkeeper</h3>
            <p>Manage your shop and orders</p>
          </div>
        </div>
      </div>
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Efficient Management</h3>
            <p>Streamline your business operations with our powerful tools</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Analytics</h3>
            <p>Make data-driven decisions with our comprehensive analytics</p>
          </div>
          <div className="feature-card">
            <h3>Secure Platform</h3>
            <p>Your data is safe with our advanced security measures</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our platform today and take your business to the next level</p>
      </div>
    </div>
  );
};

export default LandingPage; 