import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (location.state?.selectedRole) {
      setFormData(prev => ({ ...prev, role: location.state.selectedRole }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Add your login logic here
    navigate('/dashboard');
  };

  const handleRegister = () => {
    if (formData.role === 'company') {
      navigate('/register/company');
    } else if (formData.role === 'shopkeeper') {
      navigate('/register/shopkeeper');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Please log in to your {formData.role} account</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <div className="register-section">
          <p>Don't have an account?</p>
          <button 
            className="register-button"
            onClick={handleRegister}
            disabled={!formData.role}
          >
            Register as {formData.role}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;