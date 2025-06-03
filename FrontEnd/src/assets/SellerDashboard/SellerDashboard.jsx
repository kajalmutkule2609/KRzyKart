import React, { useState } from 'react';
import './SellerDashboard.css';
import { useNavigate } from 'react-router-dom';
import {
  FaPlus, FaSearch, FaEdit, FaMapMarkerAlt, FaClipboardList, FaIdBadge,
  FaTag, FaTrashAlt, FaUser, FaEnvelope
} from "react-icons/fa";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SecureCategoryActionPopup from './SecureCategoryActionPopup';
import CategoryPopup from './CategoryPopup';
import UpdateProduct from './UpdateProducts';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const sellerData = JSON.parse(localStorage.getItem("userData"));

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [secureActionType, setSecureActionType] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  // Category handlers
  const handleAddCategory = () => setShowCategoryPopup(true);
  const closeCategoryPopup = () => setShowCategoryPopup(false);
  const handleUpdateCategory = () => setSecureActionType('update');
  const handleDeleteCategory = () => setSecureActionType('delete');
  const handleDisplayCategory=()=> navigate("/seller-dashboard/show-category");
  // Other handlers
  const handleUpdateAccount = () => navigate("/update-user", { state: { userData: sellerData } });
  const handleDeleteAccount = () => navigate("/delete-account");
  const handleAddProduct = () => navigate("/seller-dashboard/add-product");
  const handleSearchProduct = () => navigate("/seller-dashboard/search-product");
  const handleDisplayProduct = () => navigate("/seller-dashboard/display-products-By-SellerID");
  const handleUpdateProduct = () => setShowUpdatePopup(true);

  return (
    <div className="seller-dashboard-container">
      <div className="seller-profile">
        <h2>Account Details</h2>
        <FaUser className='user'/>
        <p className='name'>{sellerData.fullName}</p>
        <p className='det'><strong><FaEnvelope /></strong> {sellerData.email}</p>
        <p className='det'><strong><FaIdBadge /></strong> {sellerData.contactNo}</p>
        <p className='det'><strong><FaMapMarkerAlt /></strong> {sellerData.address}</p>

        <div className="update-delete">
          <button className="up" id='up' onClick={handleUpdateAccount}>Update Profile</button>
          <button className="de" id='de' onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-section">
          <h3>Manage Products</h3>
          <div className="action-buttons">
            <button className='seller-pr' onClick={handleAddProduct}><FaPlus /> Add Product</button>
            <button className='seller-pr' onClick={handleSearchProduct}><FaSearch /> Search Product</button>
            <button className='seller-pr' onClick={handleDisplayProduct}><FaClipboardList /> Display Product</button>
            <button className='seller-pr' onClick={handleUpdateProduct}><FaEdit /> Update Product</button>
          </div>
        </div>

        <div className="action-section">
          <h3>Manage Categories</h3>
          <div className="action-buttons">
            <button className='seller-pr' onClick={handleAddCategory}><FaPlus /> Add Category</button>
            <button className='seller-pr' onClick={handleDisplayCategory}><FaClipboardList /> Display Categories</button>
            <button className='seller-pr' onClick={handleUpdateCategory}><FaEdit /> Update Category</button>
            <button className='seller-pr' onClick={handleDeleteCategory}><FaTrashAlt /> Delete Category</button>
          </div>
        </div>
      </div>

      {/* Category Modals */}
      {showCategoryPopup && <CategoryPopup onClose={closeCategoryPopup} />}
      {secureActionType && (
        <SecureCategoryActionPopup
          actionType={secureActionType}
          onClose={() => setSecureActionType(null)}
        />
      )}
      {/* Product Update Modal */}
      {showUpdatePopup && (
        <UpdateProduct onClose={() => setShowUpdatePopup(false)} />
      )}
    </div>
  );
};

export default SellerDashboard;
