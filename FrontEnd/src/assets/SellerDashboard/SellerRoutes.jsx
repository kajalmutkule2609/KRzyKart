import { Routes, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import GetAllProducts from './DisplayProducts';
import SearchProduct from './SearchProducts';
import UpdateProduct from './UpdateProducts';
import GetAllProductsBySellerId from './DisplayProductsBySellerId';
import DisplayCategory from '../CustomerDashboard/DisplayCategory';
// import SellerRoutes from '../src/assets/SellerDashboard/SellerRoutes';

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Seller Dashboard</div>} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="display-products" element={<GetAllProducts />} />
      <Route path="display-products-By-SellerID" element={<GetAllProductsBySellerId />} />
      <Route path="search-product" element={<SearchProduct />} />
      <Route path="update-product" element={<UpdateProduct />} />
      <Route path="search-product" element={<SearchProduct />} />
     <Route path="show-category" element={<DisplayCategory />} />
    </Routes>
  );
};

export default SellerRoutes;