import React, { useState } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import {
  FaPlus, FaSearch, FaEdit, FaClipboardList, FaTag, FaTrashAlt
} from "react-icons/fa";
import SecureCategoryActionPopup from '/src/assets/SellerDashboard/SecureCategoryActionPopup';
import CategoryPopup from '/src/assets/SellerDashboard/CategoryPopup';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("userData"));
  const [showPopup, setShowPopup] = useState(false);
  const [secureActionType, setSecureActionType] = useState(null);

  const handleUpdateAccount = () => {
    navigate("/update-user", { state: { userData: adminData } });
  };

  const handleDeleteAccount = () => {
    navigate("/delete-account");
  };

  const handleDisplayProduct = () => {
    navigate("/admin-dashboard/display-products");
  };

  const handleSearchProduct = () => {
    navigate("/admin-dashboard/search-product");
  };

  const handleAddCategory = () => {
    setShowPopup(true); 
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleDisplayCategory = () => {
    navigate("/admin-dashboard/display-categories");
  };

  const handleUpdateCategory = () => {
    setSecureActionType('update');
  };

  const handleDeleteCategory = () => {
    setSecureActionType('delete');
  };

  return (
    <div className="admin-dashboard">
      <div className="left-panel">
        <h2>Account Information</h2>
        <p><span className='lables'>Name:</span>{adminData.fullName}</p>
        <p><span className='lables'>Email:</span>{adminData.email}</p>
        <p><span className='lables'>Contact:</span>{adminData.contactNo}</p>
        <p><span className='lables'>Address:</span>{adminData.address}</p>
        <div className='UpdateDelete'>
          <a className="text-dark" onClick={handleUpdateAccount}>Update Account</a>
          <a className="text-dark" onClick={handleDeleteAccount}>Delete Account</a>
        </div>
      </div>

 <div className="categories-panel">
        <h2 className='cat'>Manage Categories</h2>
        <div className="button-grid">
          <button onClick={handleAddCategory}>
            <FaTag size={20} /> Add Category
          </button>
          <button onClick={handleDisplayCategory}>
            <FaClipboardList size={20} /> Display Categories
          </button>
          <button onClick={handleUpdateCategory}>
            <FaEdit size={20} /> Update Category
          </button>
          <button onClick={handleDeleteCategory}>
            <FaTrashAlt size={20} /> Delete Category
          </button>
        </div>
      </div>

      <div className="right-panel">
        <h2>Manage Products</h2>
        <div className="button-grid">
          <button onClick={handleDisplayProduct}>
            <FaClipboardList size={20} /> Display Products
          </button>
          <button onClick={handleSearchProduct}>
            <FaSearch size={20} /> Search Product
          </button>
        </div>
      </div>

      {showPopup && <CategoryPopup onClose={closePopup} />}
      {secureActionType && (
        <SecureCategoryActionPopup
          actionType={secureActionType}
          onClose={() => setSecureActionType(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
