import React, { useState } from 'react';
import './SellerDashboard.css';
import { useNavigate } from 'react-router-dom';
import {
  FaPlus, FaSearch, FaEdit, FaClipboardList, FaTag, FaTrashAlt
} from "react-icons/fa";
import SecureCategoryActionPopup from './SecureCategoryActionPopup';
import CategoryPopup from './CategoryPopup';
import UpdateProduct from './UpdateProducts'; 

const SellerDashboard = () => {
  const navigate = useNavigate();
  const sellerData = JSON.parse(localStorage.getItem("userData"));
  const [showPopup, setShowPopup] = useState(false);
  const [secureActionType, setSecureActionType] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false); 

  const handleAddCategory = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleUpdateAccount = () => {
    navigate("/update-user", { state: { userData: sellerData } });
  };

  const handleDeleteAccount = () => {
    navigate("/delete-account");
  };

  const handleAddProduct = () => {
    navigate("/seller-dashboard/add-product");
  };

  const handleDisplayProduct = () => {
    navigate("/seller-dashboard/display-products-By-SellerID");
  };

  const handleSearchProduct = () => {
    navigate("/seller-dashboard/search-product");
  };

  
  const handleUpdateProduct = () => {
    setShowUpdatePopup(true);
  };

  const handleDisplayCategory = () => {
    navigate("/seller-dashboard/display-categories");
  };

  const handleUpdateCategory = () => {
    setSecureActionType('update');
  };

  const handleDeleteCategory = () => {
    setSecureActionType('delete');
  };

  return (
    <div className="seller-dashboard">
      <div className="left-panel">
        <h2>Account Information</h2>
        <p><span className='lables'>Name:</span>{sellerData.fullName}</p>
        <p><span className='lables'>Email:</span>{sellerData.email}</p>
        <p><span className='lables'>Contact:</span>{sellerData.contactNo}</p>
        <p><span className='lables'>Address:</span>{sellerData.address}</p>
        <div className='UpdateDelete'>
          <a className="text-dark" onClick={handleUpdateAccount}>Update Account</a>
          <a className="text-dark" onClick={handleDeleteAccount}>Delete Account</a>
        </div>
      </div>

      <div className="right-panel">
        <h2>Manage Products</h2>
        <div className="button-grid">
          <button onClick={handleAddProduct}>
            <FaPlus size={20} /> Add Product
          </button>
          <button onClick={handleDisplayProduct}>
            <FaClipboardList size={20} /> Display Products
          </button>
          <button onClick={handleSearchProduct}>
            <FaSearch size={20} /> Search Product
          </button>
          <button onClick={handleUpdateProduct}> 
            <FaEdit size={20} /> Update Product
          </button>
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

      {showPopup && <CategoryPopup onClose={closePopup} />}
      {secureActionType && (
        <SecureCategoryActionPopup
          actionType={secureActionType}
          onClose={() => setSecureActionType(null)}
        />
      )}
      {showUpdatePopup && (
        <UpdateProduct onClose={() => setShowUpdatePopup(false)} /> 
      )}
    </div>
  );
};

export default SellerDashboard;
