import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";



function Navbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token"), // CHECK FOR TOKEN INSTEAD
  );

  /* CART COUNT */
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  /* LOGIN STATUS */
  useEffect(() => {
    const updateLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); // CHECK FOR TOKEN
    };

    updateLogin(); // CHECK ON MOUNT
    window.addEventListener("loginChanged", updateLogin);
    return () => window.removeEventListener("loginChanged", updateLogin);
  }, []);

  const handleSearch = () => {
    if (!searchText.trim()) return alert("Please enter something");
    navigate("/search", { state: { searchText } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("loginChanged"));
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        style={{
          background: "linear-gradient(135deg, #f2efff, #ffffff)",
          padding: "12px 30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div className="container-fluid">
          {/* BRAND */}
          <Link
            to="/"
            className="navbar-brand"
            style={{
              fontSize: "34px",
              color: "olive",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <i className="bi bi-shop-window me-2 text-warning"></i>
            FoodiesHub
          </Link>

          {/* HAMBURGER */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "3px solid olive",
              padding: "12px 18px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
              boxShadow: "0 4px 12px rgba(128, 128, 0, 0.3)",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23808000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='4' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")",
                width: "28px",
                height: "28px",
              }}
            ></span>
          </button>

          {/* COLLAPSE CONTENT - HORIZONTAL ON MOBILE */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="w-100 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mt-3 mt-lg-0">
              {/* LEFT - NAVIGATION LINKS */}
              <div className="d-flex flex-row gap-3 align-items-center flex-wrap mb-3 mb-lg-0">
                <Link to="/" style={linkStyle}>
                  <i className="bi bi-house-door-fill me-1"></i>
                  Home
                </Link>
                <Link to="/about" style={linkStyle}>
                  <i className="bi bi-info-circle-fill me-1"></i>
                  About
                </Link>
                <Link to="/contact" style={linkStyle}>
                  <i className="bi bi-envelope-fill me-1"></i>
                  Contact
                </Link>
              </div>

              {/* MIDDLE - SEARCH BAR */}
              <div className="d-flex gap-2 mb-3 mb-lg-0">
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search..."
                  style={searchInputStyle}
                />
                <button onClick={handleSearch} style={searchBtnStyle}>
                  <i className="bi bi-search"></i> Go
                </button>
              </div>

              <Link to="/chat" style={linkStyle}>
  <FaComments style={{ marginRight: '5px' }} />
  Chat
</Link>

              {/* RIGHT - CART & AUTH BUTTONS */}
              <div className="d-flex gap-3 align-items-center flex-wrap">
                <div
                  onClick={() => navigate("/cart")}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <FaShoppingCart size={32} color="olive" />
                  {cartCount > 0 && (
                    <span style={cartBadgeStyle}>{cartCount}</span>
                  )}
                </div>

                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      style={btnStyle}
                    >
                      <i className="bi bi-person-plus-fill me-1"></i>
                      Registration
                    </button>
                    <button onClick={() => navigate("/login")} style={btnStyle}>
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Login
                    </button>
                  </>
                ) : (
                  <button onClick={handleLogout} style={btnStyle}>
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HEADLINE */}
      <div style={headlineStyle}>
        <marquee>
          <i className="bi bi-heart-fill text-danger me-2"></i>
          <span>
            YumVerse brings your favourite flavours together in one place,
            turning everyday cravings into delightful food experiences with just
            a few clicks.
          </span>
          <i className="bi bi-heart-fill text-danger ms-2"></i>
        </marquee>
      </div>
    </>
  );
}

export default Navbar;

const linkStyle = {
  color: "olive",
  fontSize: "22px",
  textDecoration: "none",
  fontWeight: "600",
  whiteSpace: "nowrap",
  padding: "10px",
};

const btnStyle = {
  border: "2px solid olive",
  padding: "9px 29px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  background: "white",
  color: "olive",
  fontWeight: "600",
  transition: "all 0.3s",
  whiteSpace: "nowrap",
};

const searchInputStyle = {
  padding: "7px 10px",
  width: "140px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "2px solid olive",
};

const searchBtnStyle = {
  padding: "7px 15px",
  borderRadius: "8px",
  border: "2px solid olive",
  background: "white",
  cursor: "pointer",
  color: "olive",
  fontWeight: "600",
};

const cartBadgeStyle = {
  position: "absolute",
  top: "-8px",
  right: "-10px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  padding: "2px 7px",
  fontSize: "14px",
  fontWeight: "bold",
};

const headlineStyle = {
  position: "fixed",
  top: "75px",
  left: 0,
  width: "100%",
  background: "black",
  color: "white",
  padding: "10px 0",
  fontSize: "20px",
  fontWeight: "700",
  zIndex: 999,
};
