import React from "react";

// FORCE UPDATE - DELETE THIS LINE AFTER TESTING
console.log("Foodcard loaded at:", new Date().toISOString());

function Foodcard({ item, handleAdd }) {
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    
    console.log("🔍 CHECKING TOKEN:", token); 
    console.log("🔍 TOKEN EXISTS:", !!token);

    if (!token) {
      console.log("❌ NO TOKEN - SHOWING ALERT");
      alert("Please login to add items.");
      return;
    }

    console.log("✅ TOKEN FOUND - ADDING TO CART");
    handleAdd(item);
  };

  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>

      <button onClick={handleAddToCart} className="add-btn">
        Add to Cart
      </button>
    </div>
  );
}

export default Foodcard;