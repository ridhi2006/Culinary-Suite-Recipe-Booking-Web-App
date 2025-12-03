import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewRecipe.css";

export default function NewRecipe() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();  
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: null,       // base64 string
    vegType: "",       // "veg" | "all"
  });

  // Convert file -> base64 so it persists across reloads
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const dataUrl = await toBase64(file);
    setRecipe((r) => ({ ...r, image: dataUrl }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipe.vegType) {
      alert("Please select whether the recipe is Pure Veg or All Dishes!");
      return;
    }

    // add id + timestamp (helpful for keys & sorting)
    const toSave = {
      ...recipe,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("recipes") || "[]");
    saved.unshift(toSave); // newest at top
    localStorage.setItem("recipes", JSON.stringify(saved));

    // notify Home to re-render immediately
    window.dispatchEvent(new Event("recipesUpdated"));

    alert("🎉 Recipe uploaded successfully!");

    setRecipe({
      name: "",
      ingredients: "",
      instructions: "",
      image: null,
      vegType: "",
    });
    setShowForm(false);
    navigate("/mainpage");
  };

  return (
    <div className="add-recipe-container">
      {!showForm ? (
        <div className="plus-section">
          <button className="plus-btn" onClick={() => setShowForm(true)}>+</button>
          <p className="plus-text">Click + to Add Your Recipe</p>
        </div>
      ) : (
        <form className="recipe-form" onSubmit={handleSubmit}>
          <h2>Add Your Recipe 🍳</h2>

          <label>Upload Recipe Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {recipe.image && <img src={recipe.image} alt="Preview" className="preview-img" />}

          <label>Recipe Name</label>
          <input
            type="text"
            placeholder="Enter recipe name"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            required
          />

          <label>Ingredients</label>
          <textarea
            placeholder="List ingredients (comma separated is fine)..."
            value={recipe.ingredients}
            onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
            required
          />

          <label>Instructions</label>
          <textarea
            placeholder="Write your cooking steps..."
            value={recipe.instructions}
            onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
            required
          />

          <div className="veg-type-selection">
            <p>Select Dish Type:</p>
            <div className="veg-buttons">
              <button
                type="button"
                className={`veg-btn ${recipe.vegType === "veg" ? "active" : ""}`}
                onClick={() => setRecipe({ ...recipe, vegType: "veg" })}
                style={{ backgroundColor: "green" }}
              >
                🥦 Pure Veg
              </button>
              <button
                type="button"
                className={`nonveg-btn ${recipe.vegType === "all" ? "active" : ""}`}
                onClick={() => setRecipe({ ...recipe, vegType: "all" })}
                style={{ backgroundColor: "red" }}
              >
                🍗 All Dishes
              </button>
            </div>
          </div>

          <button type="submit" className="upload-btn">Upload Recipe</button>
        </form>
      )}
    </div>
  );
}
