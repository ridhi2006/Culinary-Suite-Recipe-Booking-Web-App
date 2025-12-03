// src/pages/MainPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Popup from "../components/Popup";
import BookmarkFeature from "../pages/Bookmark";
import "../styles/MainPage.css";

const normalizeRecipe = (r) => {
  const isUploaded = !!r.name || !!r.image;
  const title = r.title || r.name || "Untitled";
  const img = r.img || r.image || "";
  const time = r.time || "—";

  const ingredients = Array.isArray(r.ingredients)
    ? r.ingredients
    : String(r.ingredients || "")
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean);

  let vegType = r.vegType || "all";
  if (vegType === "non-veg") vegType = "all";

  return {
    id: r.id ?? `${title}-${Math.random().toString(36).slice(2)}`,
    title,
    img,
    time,
    ingredients,
    instructions: r.instructions || "—",
    vegType,
    _raw: r,
    _isUploaded: isUploaded,
  };
};

function MainPage() {
  const [showPopup, setShowPopup] = useState(() => !sessionStorage.getItem("popupShown"));
  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupShown", "true");
  };

  // veg filter
  const [vegFilter, setVegFilter] = useState(() => localStorage.getItem("vegFilter") || "all");
  useEffect(() => {
    localStorage.setItem("vegFilter", vegFilter);
  }, [vegFilter]);

  // search query (from Navbar)
  const [searchQuery, setSearchQuery] = useState("");

  // recipes
  const [recipes, setRecipes] = useState([]);

  const defaultRecipes = useMemo(
    () => [
      {
        id: 1,
        title: "Paneer Butter Masala",
        time: "30 mins",
        ingredients: ["Paneer", "Butter", "Tomatoes", "Cream", "Spices"],
        instructions:
          "Cook tomatoes in butter, blend to puree, add spices and cream, then paneer cubes.",
        img: "/paneer.jpg",
        vegType: "veg",
      },
      {
        id: 2,
        title: "Veg Biryani",
        time: "45 mins",
        ingredients: ["Rice", "Mixed Vegetables", "Yogurt", "Spices"],
        instructions:
          "Layer fried vegetables with rice, sprinkle saffron water, and steam for 15 mins.",
        img: "/biryani.jpg",
        vegType: "veg",
      },
      {
        id: 3,
        title: "Chocolate Lava Cake",
        time: "25 mins",
        ingredients: ["Flour", "Cocoa", "Butter", "Sugar", "Eggs"],
        instructions:
          "Mix ingredients, bake at 200°C for 8 minutes until gooey inside.",
        img: "/chocolava.jpg",
        vegType: "all",
      },
    ],
    []
  );

  const loadRecipes = () => {
    const uploaded = JSON.parse(localStorage.getItem("recipes") || "[]");
    setRecipes([...uploaded, ...defaultRecipes].map(normalizeRecipe));
  };

  useEffect(() => {
    loadRecipes();
    const onUpdate = () => loadRecipes();
    window.addEventListener("recipesUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("recipesUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [defaultRecipes]);

  // delete only uploaded ones
  const handleDelete = (id) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    const uploadedOnly = updated.filter((r) => r._isUploaded).map((r) => r._raw);
    localStorage.setItem("recipes", JSON.stringify(uploadedOnly));
    alert("🗑 Recipe deleted successfully!");
  };

  // effective veg filter
  const effectiveFilter = vegFilter === "pure" ? "veg" : vegFilter;

  // 🔎 Combined filter: veg + search (title + ingredients)
  const filteredRecipes = recipes.filter((r) => {
    const matchVeg = effectiveFilter === "veg" ? r.vegType === "veg" : true;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchVeg;
    const inTitle = r.title.toLowerCase().includes(q);
    const inIngredients = r.ingredients.join(" ").toLowerCase().includes(q);
    return matchVeg && (inTitle || inIngredients);
  });

  return (
    <>
      {showPopup && <Popup closePopup={closePopup} />}

      {/* Pass current filter + search callback to Navbar */}
      <Navbar
        vegFilter={effectiveFilter}
        onVegFilterChange={setVegFilter}
        onSearchChange={setSearchQuery}
      />

      <Hero />

      <section className="recipes-section">
        <h2 className="section-title">Explore Recipes 🍴</h2>
        <p style={{ opacity: 0.8, marginTop: "-8px", marginBottom: "12px" }}>
          Showing: <strong>{effectiveFilter === "veg" ? "Pure Veg" : "All Dishes"}</strong>
          {searchQuery ? (
            <> • Search: <em>{searchQuery}</em></>
          ) : null}
        </p>

        <div className="recipe-container">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              {recipe.img ? (
                <img src={recipe.img} alt={recipe.title} />
              ) : (
                <div className="img-fallback">No Image</div>
              )}

              <div className="recipe-details">
                <div className="top-row">
                  <h3>{recipe.title}</h3>
                  {recipe._isUploaded && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(recipe.id)}
                      title="Delete this recipe"
                    >
                      🗑
                    </button>
                  )}
                </div>

                <div className="meta-row">
                  <p className="recipe-time">{recipe.time}</p>
                  <span
                    className={`veg-badge ${recipe.vegType === "veg" ? "veg" : "all"}`}
                  >
                    {recipe.vegType === "veg" ? "Pure Veg" : "All Dishes"}
                  </span>
                </div>

                <ul className="recipe-ingredients">
                  {recipe.ingredients.slice(0, 6).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <p className="recipe-instructions">{recipe.instructions}</p>

                <BookmarkFeature recipe={recipe} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default MainPage;
