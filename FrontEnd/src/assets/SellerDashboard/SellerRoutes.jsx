import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerDashboard from "./SellerDashboard";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProducts";
import SearchProducts from "./SearchProducts";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="/seller/add-product" element={<AddProduct />} />
      <Route path="/seller/view-products" element={<ViewProducts />} />
      <Route path="/seller/search-products" element={<SearchProducts />} />
      <Route path="/seller/delete-product" element={<DeleteProduct />} />
      <Route path="/seller/update-product" element={<UpdateProduct />} />
    </Routes>
  );
};

export default SellerRoutes;