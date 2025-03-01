import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    navigate('/login', { state: { selectedRole: role } });
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p>Your ultimate solution for seamless business management</p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={() => handleRoleSelect('company')}>
              Register as Company
            </button>
            <button className="cta-secondary" onClick={() => handleRoleSelect('shopkeeper')}>
              Register as Shopkeeper
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Efficient Management</h3>
            <p>Streamline your business operations with our powerful tools</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Real-Time Analytics</h3>
            <p>Make data-driven decisions with our comprehensive analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>Your data is safe with our advanced security measures</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This platform has transformed the way we manage our business!"</p>
            <div className="testimonial-author">- John Doe, Company Owner</div>
          </div>
          <div className="testimonial-card">
            <p>"Easy to use and incredibly helpful for managing my shop."</p>
            <div className="testimonial-author">- Jane Smith, Shopkeeper</div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <p>© 2023 Your Platform. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage; 