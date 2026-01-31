import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>

        <p>
          Thank you for choosing <b>YumVerse</b> ❤️  
          Your food is being prepared with lots of love 🍽️
        </p>

        <p className="heart-msg">
          “Good food is the foundation of genuine happiness.”
        </p>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
