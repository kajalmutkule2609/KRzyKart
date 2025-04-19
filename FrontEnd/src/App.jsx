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
import ProtectedRoute from '../src/assets/SellerDashboard/ProtectedRoute';
import SellerDashboard from '../src/assets/SellerDashboard/SellerDashboard';


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
            <Route path="/seller-dashboard/*" element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}
