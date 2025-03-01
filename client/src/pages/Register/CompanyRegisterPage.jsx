import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const CompanyRegisterPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    logisticPersonName: '',
    phoneNumber: '',
    categories: []
  });
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (index) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Registration Data:', formData);
    // Add your registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Company Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="logisticPersonName">Logistic Person Name</label>
            <input
              type="text"
              id="logisticPersonName"
              name="logisticPersonName"
              placeholder="Enter logistic person name"
              value={formData.logisticPersonName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product Categories</label>
            <div className="category-input">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              <button
                type="button"
                className="add-category-button"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
            <div className="categories-list">
              {formData.categories.map((category, index) => (
                <div key={index} className="category-item">
                  <span>{category}</span>
                  <button
                    type="button"
                    className="remove-category-button"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegisterPage; 