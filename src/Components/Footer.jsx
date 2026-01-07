import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-section">
         <h2><i class="bi bi-cup-hot me-2"></i>FoodiesHub</h2>

          <p>
            Delivering happiness, one bite at a time   
            Fresh • Fast • Delicious
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li> <Link to="/"><i className="bi bi-house"></i> Home</Link></li>
            <li><Link to="/about"><i className="bi bi-cart"></i> About</Link></li>
            <li><Link to="/contact"><i className="bi bi-bag-check"></i> Contact</Link></li>
            <li><Link to="/cart"><i className="bi bi-person"></i>Cart</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><i className="bi bi-geo-alt"></i> Mumbai, India</p>
          <p><i className="bi bi-telephone"></i> +91 98765 43210</p>
          <p><i className="bi bi-envelope"></i> support@foodieshub.com</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-twitter-x"></i>
            <i className="bi bi-youtube"></i>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© 2025 Foodies Hub. All Rights Reserved ❤️</p>
      </div>
    </footer>
  );
}

export default Footer;
