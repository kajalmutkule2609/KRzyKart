import React, { useState, useEffect } from 'react';
import { getAllCategories, deleteCategory, updateCategory } from '../../Apis/categoryApi.api';
import './SecureCategoryActionPopup.css';

const SecureCategoryActionPopup = ({ onClose, actionType }) => {
  const [securityCode, setSecurityCode] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [categories, setCategories] = useState([]);
  const [updatedName, setUpdatedName] = useState({});

  const VALID_CODE = 'Seller@11'; 

  const handleValidate = () => {
    if (securityCode === VALID_CODE) {
      setAuthorized(true);
      fetchCategories();
    } else {
      alert('Invalid security code');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDelete = async (name) => {
    try {
      await deleteCategory(name);
      alert('Category deleted');
      fetchCategories(); 
    } catch (error) {
      alert("Error deleting category");
    }
  };

  const handleUpdate = async (name) => {
    const newName = updatedName[name];
    if (!newName || newName.trim() === '') {
      alert("New category name required.");
      return;
    }
    try {
      await updateCategory(name, { name: newName });
      alert('Category updated');
      fetchCategories(); 
    } catch (error) {
      alert("Error updating category");
    }
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <h2>{actionType === 'delete' ? 'Delete' : 'Update'} Category</h2>
        {!authorized ? (
  <>
    <label>Enter Security Code:</label>
    <input
      type="password"
      value={securityCode}
      onChange={(e) => setSecurityCode(e.target.value)}
    />
    <div>
      <button onClick={handleValidate}>Validate</button>
    </div>
  </>
) : (
  <div className="category-list">
    {categories.map((cat, index) => (
      <div key={index} className="category-item">
        <strong>{cat.name}</strong>
        {actionType === 'delete' ? (
          <button onClick={() => handleDelete(cat.name)}>Delete</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="New name"
              value={updatedName[cat.name] || ''}
              onChange={(e) =>
                setUpdatedName({ ...updatedName, [cat.name]: e.target.value })
              }
            />
            <button onClick={() => handleUpdate(cat.name)}>Update</button>
          </>
        )}
      </div>
    ))}
  </div>
)}
<div>
  <button onClick={onClose} className="close-btn">Close</button>
</div>
</div>
    </div>
  );
};

export default SecureCategoryActionPopup;
