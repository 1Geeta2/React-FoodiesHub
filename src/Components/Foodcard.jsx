  import React from "react";

  function Foodcard({ item, handleAdd }) {
    const handleAddToCart = () => {
      const isLoggedIn = localStorage.getItem("loggedIn");

      if (!isLoggedIn) {
        alert("Please login to add items.");
        return;
      }

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
