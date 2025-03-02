import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectCompanies.css';

const companiesData = {
  electronics: ['Company A', 'Company B'],
  groceries: ['Company C', 'Company D'],
  clothing: ['Company E', 'Company F'],
};

const SelectCompanies = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCompanyClick = (company) => {
    navigate(`/shopkeeper/addinventory/selectitems?company=${company}`);
  };

  return (
    <div className="select-companies-container">
      <h2>Select Companies</h2>
      <select onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {Object.keys(companiesData).map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <div className="companies-list">
        {selectedCategory &&
          companiesData[selectedCategory].map((company) => (
            <div
              key={company}
              className="company-item"
              onClick={() => handleCompanyClick(company)}
            >
              {company}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectCompanies;