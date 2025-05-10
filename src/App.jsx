import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar";
import ImageCarousel from "./Home/ImageCarousel";
import Brands from "./Home/Brands";
import NewArrivals from "./Home/NewArrivals";
import TopSelling from "./Home/TopSelling";
import DressStyles from "./Home/DressStyles";
import Testimonials from "./Home/Testimonials";
import Footer from "./Home/Footer";
import SignUp from "../src/Pages/SignIn";
import Login from "../src/Pages/Login";
import ResetPassword from "../src/Pages/RestPassword";
import CategoryBar from "./Home/CategoryBar";
import KilosPage from "../src/CategoryProductPages/KilosPage";
import SignUpForSeller from "../src/Pages/Signup";
import Wishlist from "../src/CategoryProductPages/Wishlist";
import { WishlistProvider } from "../src/CategoryProductPages/WishlistContext";
import { CartProvider } from "../src/CategoryProductPages/CartContext";
import Cart from '../src/CategoryProductPages/Cart';
import Checkout from '../src/CategoryProductPages/Checkout';
import Address from '../src/CategoryProductPages/Address';
import Payment from '../src/CategoryProductPages/Payment';
import Shipping from '../src/CategoryProductPages/Shipping';
import ProtectedRoute from '../src/assets/SellerDashboard/ProtectedRoute';
import SellerDashboard from '../src/assets/SellerDashboard/SellerDashboard';
import UpdateUser from "../src/assets/User/UpdateUser";
import DeleteAccount from "../src/assets/User/DeleteAccount";
import AddProduct from "./assets/SellerDashboard/AddProduct";
import GetAllProducts from "./assets/SellerDashboard/DisplayProducts";
import UpdateProduct from "./assets/SellerDashboard/UpdateProducts";
import SearchProduct from "./assets/SellerDashboard/SearchProducts";
import ProductsByCategory from "./assets/SellerDashboard/ProductsByCategory";
import AdminDashboard from '../src/assets/AdminDashboard/AdminDashboard';
import DisplayAllProducts from '../src/assets/CustomerDashboard/DisplayProducts';
import GetAllProductsBySellerId from "./assets/SellerDashboard/DisplayProductsBySellerId";
export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <div className="bg-gray-100">
                <CategoryBar />
                <ImageCarousel />
                <Brands />
                <NewArrivals />
                <TopSelling />
                <DressStyles />
                <Testimonials />
                <Footer />
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/SignUpForSeller" element={<SignUpForSeller />} />
            <Route path="/category/kilos" element={<KilosPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/address" element={<Address/>}/>
            <Route path="/payment" element={<Payment/>}/>
             <Route path="/shipping" element={<Shipping/>}/>
            <Route path="/productByCategory/:category" element={<ProductsByCategory />} />
            <Route path="/seller-dashboard" element={<ProtectedRoute />}>
              <Route index element={<SellerDashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="display-products" element={<GetAllProducts />} />
              <Route path="display-products-By-SellerID" element={<GetAllProductsBySellerId/>}/>
              <Route path="search-product" element={<SearchProduct />} />
              <Route path="search-product/:searchTerm" element={<SearchProduct />} />
              <Route path="update-product" element={<UpdateProduct />} />
            </Route>
            <Route path="/admin-dashboard" element={<ProtectedRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="display-products" element={<GetAllProducts />} />
              <Route path="search-product" element={<SearchProduct />} />
              <Route path="search-product/:searchTerm" element={<SearchProduct />} />
              <Route path="update-product" element={<UpdateProduct />} />
            </Route>
            <Route path="/display-products" element={<DisplayAllProducts />} />
            <Route path="/display-products/:category" element={<DisplayAllProducts />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}
