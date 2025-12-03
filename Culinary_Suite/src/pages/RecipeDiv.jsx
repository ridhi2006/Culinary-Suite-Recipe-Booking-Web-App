<div className="recipe-card">
  <img src={img} alt={title} />
  <div className="recipe-details">
    <span className="recipe-time">{time}</span>
    <h3>{title}</h3>
    <ul className="recipe-ingredients">
      {ingredients.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <p className="recipe-instructions">{instructions}</p>
  </div>
</div>
