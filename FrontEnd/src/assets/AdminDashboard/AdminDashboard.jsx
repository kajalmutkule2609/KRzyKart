import React, { useState } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit,FaMapMarkerAlt, FaClipboardList,FaIdBadge, FaTag, FaTrashAlt,FaUser,FaEnvelope } from "react-icons/fa";
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

 const handleDisplayCategory=()=> navigate("/admin-dashboard/show-category");

  const handleUpdateCategory = () => {
    setSecureActionType('update');
  };

  const handleDeleteCategory = () => {
    setSecureActionType('delete');
  };
  const handleAllOrders = () => {
  navigate("/admin-dashboard/all-orders");
};


  return (
    <div className="admin-dashboard">
      <div className="profile-section">
    <h2>Account Details</h2>
    <FaUser className="user-icon" />
    <p className="admin-name">{adminData.fullName}</p>
    <p className='det'><FaEnvelope /> {adminData.email}</p>
    <p className='det'><FaIdBadge /> {adminData.contactNo}</p>
    <p className='det'><FaMapMarkerAlt /> {adminData.address}</p>
    <div className="account-actions">
      <button onClick={handleUpdateAccount}>Update Profile</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  </div>

<div>
  {/* Product Section */}
  <div className="section-box">
    <h2>Manage Products</h2>
    <div className="button-grid">
      <button onClick={handleAllOrders}><FaClipboardList /> View All Orders</button>
      <button onClick={handleDisplayProduct}><FaClipboardList /> Display Product</button>
      <button onClick={handleSearchProduct}><FaSearch /> Search Product</button>
    </div>
  </div>

  {/* Category Section */}
  <div className="section-box">
    <h2>Manage Categories</h2>
    <div className="button-grid">
      <button onClick={handleAddCategory}><FaPlus /> Add Category</button>
      <button onClick={handleDisplayCategory}><FaClipboardList /> Display Categories</button>
      <button onClick={handleUpdateCategory}><FaEdit /> Update Category</button>
      <button onClick={handleDeleteCategory}><FaTrashAlt /> Delete Category</button>
    </div>
  </div>
</div>
  {/* Popups */}
  {showPopup && <CategoryPopup onClose={closePopup} />}
  {secureActionType && (
    <SecureCategoryActionPopup actionType={secureActionType} onClose={() => setSecureActionType(null)} />
  )}
</div>
  );
};

export default AdminDashboard;
