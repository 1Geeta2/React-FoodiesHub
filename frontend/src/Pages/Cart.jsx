import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  //  Address state
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.map((item) => ({
      ...item,
      qty: item.qty || 1,
    }));

    setCartItems(updatedCart);
  }, []);

  //  UPDATE LOCAL STORAGE
  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  //  QUANTITY CONTROLS
  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].qty += 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      updateCart(updated);
    }
  };

  //  REMOVE ITEM
  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateCart(updated);
  };

  //  BILLING
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const navigate = useNavigate();

  //  PLACE ORDER (UPDATED TO SAVE TO BACKEND)
  const placeOrder = async () => {
    //  Address validation
    if (!fullName.trim() || !mobile.trim() || !address.trim()) {
      alert("Please fill all delivery details ❤️");
      return;
    }

    if (mobile.length < 10) {
      alert("Please enter a valid mobile number 📱");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      // Prepare order data for backend
      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        totalAmount: total,
        paymentMethod: "Cash on Delivery",
        deliveryAddress: `${fullName}, ${mobile}, ${address}`,
        notes: "",
      };

      // Send to backend
      const response = await fetch("http://localhost:5000/api/foods/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        // Clear cart
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));

        alert("Order placed successfully! 🎉");
        navigate("/order-success");
      } else {
        alert("Order failed: " + data.message);
      }
    } catch (error) {
      console.error("❌ Order error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="empty-cart">🛒 Cart is empty</h2>
      ) : (
        <div className="cart-layout">
          {/* LEFT - CART ITEMS */}
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-card">
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - BILLING */}
          <div className="billing-box">
            <h2>Bill Details</h2>

            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="bill-row">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            <hr />

            <div className="bill-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {/* PAYMENT */}
            <h3>Payment Method</h3>

            <div className="cod-box">
              <span className="cod-icon">💵</span>
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when your food arrives 🍔</p>
              </div>
            </div>

            {/* ADDRESS */}
            <h3>Delivery Address</h3>

            <input
              className="address-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              className="address-input"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <textarea
              className="address-input"
              placeholder="Complete Address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              className="place-order"
              onClick={placeOrder}
              disabled={!fullName || !mobile || !address}
            >
              Place Order ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
