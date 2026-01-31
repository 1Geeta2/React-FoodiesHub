import React from "react";

const cravings = [
  { name: "Pizzas", img: "/assets/Cravings/pizza.jpg" },
  { name: "Burgers", img: "/assets/Cravings/bur.jpg" },
  { name: "Sandwiches", img: "/assets/Cravings/sandwiches.jpg" },
  { name: "Pasta & Noodles", img: "/assets/Cravings/nooo.jpg" },
  { name: "Snacks & Starters", img: "/assets/Cravings/snak.avif" },
  { name: "Indian Meals", img: "/assets/Cravings/meal.webp" },
  { name: "Beverages", img: "/assets/Cravings/Beverages.jpg" },
  { name: "Desserts & Sweets", img: "/assets/Cravings/sweet.jpg" },
  { name: "Garlic Bread", img: "/assets/Cravings/Cheese Garlic Bread.webp" },
  { name: "Salad", img: "/assets/Cravings/salad.webp" },
  { name: "Milkshakes", img: "/assets/Cravings/milkshake.avif" },
  { name: "Mocktails", img: "/assets/Cravings/mocktail.webp" },
];

function Cravings({ onCravingClick }) {
  return (
    <div className="cravings-section">
      <h2>What are you craving for?</h2>

      <div className="cravings-row">
        {cravings.map((item, index) => (
          <div
            className="craving-item"
            key={index}
            onClick={() => onCravingClick(item.name)} // ✅ CLICK HERE
            style={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cravings;
