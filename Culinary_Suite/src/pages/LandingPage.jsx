import React from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="book-container">
      {/* ✅ Use absolute path if image is in public/ */}
      <img src="/backimage.jpg" alt="Notebook" />
      <div className="text" contentEditable="true">
        <br />
        <center>
          ✨Welcome to Culinary Suite✨
          <br />
          <br />
          <i>
            Where recipes meet creativity,
            <br />
            and every dish tells a story.
            <br />
            <br />
            Bon Appétit! 🍴
          </i>
        </center>
        <br />
        <br />
        <center>
          <button
            className="btn"
            onClick={() => (window.location.href = "/login")}
          >
            <i>LogIn</i>
          </button>
          <button
            className="btn"
            onClick={() => (window.location.href = "/signup")}
          >
            <i>SignUp</i>
          </button>
        </center>
      </div>
    </div>
  );
};

export default LandingPage;