import React from "react";
import { useLocation } from "react-router-dom";
import data from "./Data";
import Foodcard from "../components/Foodcard";

function SearchResult() {
  const location = useLocation();
  const searchText = (location.state?.searchText || "").toLowerCase();

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(searchText)
  );

  // ✅ ADD TO CART LOGIC (THIS WAS MISSING)
  const handleAdd = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify navbar
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Item added to cart!");
  };

  return (
    <div style={{ padding: "120px 40px" }}>
      <h1>
        Search Results for:{" "}
        <span style={{ color: "red" }}>"{searchText}"</span>
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Foodcard
              key={item.id}
              item={item}
              handleAdd={handleAdd}   // ✅ PASS IT
            />
          ))
        ) : (
          <h2 style={{ color: "gray" }}>❌ No results found</h2>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
