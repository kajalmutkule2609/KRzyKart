import React from 'react';
// import AddProduct from './AddProduct';
// import GetAllProducts from './DisplayProducts';
// import SearchProduct from './SearchProducts';
// import UpdateProduct from './UpdateProducts';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaClipboardList, FaTag, FaTrashAlt } from "react-icons/fa";

const SellerDashboard = () => {

  const navigate = useNavigate();
  const sellerData = JSON.parse(localStorage.getItem("userData"));
  console.log(sellerData);

  const handleUpdateAccount = () => {
    navigate("/update-user", { state: { userData: sellerData } });
  };
  const handleDeleteAccount = () => {
    navigate("/delete-account");
  };
  // const handleAddProduct = () => {
  //   navigate("/admin-dashboard/add-product");
  // };

  const handleDisplayProduct = () => {
    navigate("/admin-dashboard/display-products");
  };

  const handleSearchProduct = () => {
    navigate("/admin-dashboard/search-product");
  };
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  const handleAddCategory = () => {
    navigate("/admin-dashboard/add-category");
  };

  const handleDisplayCategory = () => {
    navigate("/admin-dashboard/display-categories");
  };

  const handleUpdateCategory = () => {
    navigate("/admin-dashboard/update-category");
  };

  const handleDeleteCategory = () => {
    navigate("/admin-dashboard/delete-category");
  };

  return (
      <div className="admin-dashboard">
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
            {/* <button onClick={handleAddProduct}>
              <FaPlus size={20} /> Add Product
            </button> */}
            <button onClick={handleDisplayProduct}>
              <FaClipboardList size={20} /> Display Products
            </button>
            <button onClick={handleSearchProduct}>
              <FaSearch size={20} /> Search Product
            </button>
            {/* <button onClick={() => handleButtonClick("update-product")}>
              <FaEdit size={20} /> Update Product
            </button> */}
          </div>
        </div>
      </div>
    );
  };

export default SellerDashboard;
