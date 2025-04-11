import React from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import "../homeCss/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      {/* Newsletter Subscription Section */}
      <div className="footer-newsletter">
        <h2>STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS</h2>
        <div className="newsletter-input">
          <FaEnvelope className="icon" />
          <input type="email" placeholder="Enter your email address" />
        </div>
        <button className="subscribe-btn">Subscribe to Newsletter</button>
      </div>

      {/* Footer Content Section */}
      <div className="footer-content">
        <div className="footer-info">
          <h2>SHOP.CO</h2>
          <p>We have clothes that suit your style and which<br/> you’re proud to wear. From women to men.</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaGithub />
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div>
            <h3>COMPANY</h3>
            <ul>
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </div>
          <div>
            <h3>HELP</h3>
            <ul>
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3>FAQ</h3>
            <ul>
              <li>Account</li>
              <li>Manage Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>
          <div>
            <h3>RESOURCES</h3>
            <ul>
              <li>Free eBooks</li>
              <li>Development Tutorial</li>
              <li>How to - Blog</li>
              <li>Youtube Playlist</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
