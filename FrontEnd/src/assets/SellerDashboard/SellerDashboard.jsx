import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import GetAllProducts from './DisplayProducts';
import SearchProduct from './SearchProducts';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProducts';
import './SellerDashboard.css';

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard">
      <div className="left-panel">
        <h2>Account</h2>
        <ul>
          <li><Link to="products">Products</Link></li>
          <li><Link to="account">Account</Link></li>
        </ul>
      </div>
      <div className="right-panel">
        <Routes>
          <Route path="products" element={
            <div>
              <div className="product-options">
                <Link to="add-product">Add Product</Link>
                <Link to="display-product">Display Product</Link>
                <Link to="search-product">Search Product</Link>
                <Link to="delete-product">Delete Product</Link>
                <Link to="update-product">Update Product</Link>
              </div>
              <Routes>
                <Route path="add-product" element={<AddProduct />} />
                <Route path="display-product" element={<GetAllProducts />} />
                <Route path="search-product" element={<SearchProduct />} />
                <Route path="delete-product" element={<DeleteProduct />} />
                <Route path="update-product" element={<UpdateProduct />} />
              </Routes>
            </div>
          } />
          <Route path="account" element={<div>Account Details</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default SellerDashboard;

