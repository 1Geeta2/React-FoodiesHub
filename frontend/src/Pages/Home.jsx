import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import foodData from "./Data";
import Foodcard from "../components/Foodcard";
import Cravings from "../components/Cravings";



const cravingKeywords = {
  "Pizzas": ["Pizza"],
  "Burgers": ["Burger"],
  "Sandwiches": ["Sandwich"],
  "Pasta & Noodles": ["Pasta", "Noodles"],
  "Snacks & Starters": ["Fries", "Rolls", "Spring", "Momos", "Wrap", "kebab", "Stuffing", "Roasted", "Manchurian", "Puri", "Samosa", "Papad"],
  "Indian Meals": ["Paneer", "Thali", "Dosa", "Chole", "Biryani", "Rice"],
  "Beverages": ["coffee", "tea", "drink", "lassi", "shake", "coca-cola", "pepsi", "Fanta"],
  "Milkshakes": ["Shake"],
  "Mocktails": ["Mocktail"],
  "Garlic Bread": ["Garlic Bread","French Garlic","Cheese Garlic","Baguette Garlic"],
  "Salad": ["Salad"],
  "Desserts & Sweets": [
    "Icecream",
    "Donut",
    "Cake",
    "Custard",
    "Brownie",
    "Cupcake",
    "Pudding",
    "Kulfi",
    "Rasgulla",
    "Jalebi",
    "Rasmalai",
    "Kaju",
    "Basundi",
    "Shrikhand",
    "Gulab",
    "Cheesecake",
    "Tiramisu",
    "Muffin",
    "Malpua",
    "Mousse"
  ]
};


function Home() {
  const [cart, setCart] = useState([]);
  const [filteredFood, setFilteredFood] = useState(foodData);
  const [selectedCraving, setSelectedCraving] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

const handleAdd = (item) => {
  if (!localStorage.getItem("token")) {  // ← CHANGED THIS LINE
    alert("Please login to add items.");
    return;
  }

  const updatedCart = [...cart, item];
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};

  //  THIS WAS NOT CONNECTED BEFORE
  const handleCravingClick = (cravingName) => {
    setSelectedCraving(cravingName);

    const keywords = cravingKeywords[cravingName] || [];

    const filtered = foodData.filter((item) =>
      keywords.some((word) =>
        item.name.toLowerCase().includes(word.toLowerCase())
      )
    );

    setFilteredFood(filtered);
  };

return (
  <>
    {/* FULL WIDTH HERO */}
    <div className="hero-full">
      <Carousel />
    </div>

    {/* CENTERED CONTENT */}
    <div className="page-center">
      <Cravings onCravingClick={handleCravingClick} />

      <div className="home-container">
        <h1>
          {selectedCraving
            ? `Showing: ${selectedCraving}`
            : "Delicious Food Items"}
        </h1>

        <div className="cards-container">
          {filteredFood.length > 0 ? (
            filteredFood.map((item) => (
              <Foodcard
                key={item.id}
                item={item}
                handleAdd={handleAdd}
              />
            ))
          ) : (
            <p>No items found 😔</p>
          )}
        </div>
      </div>
    </div>
  </>
);


}

export default Home;








