import React from "react";
import "../styles/Popup.css";

function Popup({ closePopup }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>👋 Welcome to Culinary Suite!</h2>
        <p>Discover and save your favorite recipes effortlessly.</p>
        <button onClick={closePopup}>Let's Cook!</button>
      </div>
    </div>
  );
}

export default Popup;
