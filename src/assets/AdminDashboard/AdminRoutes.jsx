import { Routes, Route } from 'react-router-dom';
// import AddProduct from './AddProduct';
import GetAllProducts from './DisplayProducts';
import SearchProduct from './SearchProducts';
// import UpdateProduct from './UpdateProducts';
// import SellerRoutes from '../src/assets/SellerDashboard/SellerRoutes';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Admin Dashboard</div>} />
      {/* <Route path="add-product" element={<AddProduct />} /> */}
      <Route path="display-products" element={<GetAllProducts />} />
      <Route path="search-product" element={<SearchProduct />} />
      {/* <Route path="update-product" element={<UpdateProduct />} /> */}
      <Route path="search-product" element={<SearchProduct />} />
    </Routes>
  );
};

export default AdminRoutes;