import React, { useState, useEffect } from "react";
import "../styles/AllDishes.css";

export default function AllDishes() {
  const [selectedFilter, setSelectedFilter] = useState("all"); // all or veg
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (selectedFilter === "veg") {
      setFilteredRecipes(allRecipes.filter((r) => r.vegType === "all"));
    } else {
      setFilteredRecipes(allRecipes);
    }
  }, [selectedFilter]);

  return (
    <div className="all-dishes-container">
      {/* 🧭 Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={selectedFilter === "all" ? "active" : ""}
          onClick={() => setSelectedFilter("all")}
        >
          🍗 All Dishes
        </button>
        <button
          className={selectedFilter === "veg" ? "active" : ""}
          onClick={() => setSelectedFilter("veg")}
        >
          🥦 Pure Veg
        </button>
      </div>

      {/* 🍽️ Display Filtered Recipes */}
      <div className="dishes-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div className="dish-card" key={index}>
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients}</p>
            </div>
          ))
        ) : (
          <p>No recipes found 🥺</p>
        )}
      </div>
    </div>
  );
}
