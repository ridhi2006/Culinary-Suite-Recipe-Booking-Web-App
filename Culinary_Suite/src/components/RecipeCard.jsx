import React from "react";
import "./RecipeCard.css"; // optional, ya same card styles reuse kar lo

export default function RecipeCard({ data }) {
  const { name, image, ingredients, instructions, vegType } = data;

  // Turn "salt, sugar, flour" into bullet list
  const items = (ingredients || "")
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const shortSteps =
    (instructions || "").length > 110
      ? instructions.slice(0, 110) + "..."
      : instructions;

  return (
    <div className="recipe-card">
      {image && <img className="recipe-img" src={image} alt={name} />}
      <h3 className="recipe-title">{name}</h3>

      <div className="badge-row">
        <span className={`badge ${vegType === "veg" ? "badge-veg" : "badge-all"}`}>
          {vegType === "veg" ? "Pure Veg" : "All Dishes"}
        </span>
      </div>

      <ul className="ing-list">
        {items.slice(0, 5).map((ing, i) => (
          <li key={i}>🥕 {ing}</li>
        ))}
      </ul>

      <p className="steps">
        {shortSteps || "—"}
      </p>

      <button className="save-btn">🔖 Save</button>
    </div>
  );
}
