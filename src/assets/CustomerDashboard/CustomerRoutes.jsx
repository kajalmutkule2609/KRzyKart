import { Routes, Route } from 'react-router-dom';
import GetAllProducts from './DisplayProducts';
// import SellerRoutes from '../src/assets/SellerDashboard/SellerRoutes';

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Customer Dashboard</div>} />
      {/* <Route path="add-product" element={<AddProduct />} /> */}
      <Route path="display-products" element={<GetAllProducts />} />
      {/* <Route path="search-product" element={<SearchProduct />} />
      <Route path="update-product" element={<UpdateProduct />} />
      <Route path="search-product" element={<SearchProduct />} /> */}
    </Routes>
  );
};

export default SellerRoutes;