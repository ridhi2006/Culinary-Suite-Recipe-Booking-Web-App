import React from "react";
import Navbar from "../components/Navbar";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Header */}
      <Navbar />
      <header className="about-header">
        <h1>About Culinary Suite</h1>
        <p>Your Kitchen, Your Rules – Recipes Made Simple!</p>
      </header>

      {/* Our Story */}
      <section className="section">
        <h2>Our Story</h2>
        <p>
          Culinary Suite was born out of the love for food and the idea that
          cooking should be effortless, exciting, and personalized. Whether
          you’re a beginner looking to try your first recipe or a master chef
          exploring new cuisines, we make your recipe journey smooth and
          enjoyable.
        </p>
      </section>

      {/* Features */}
      <section className="section">
        <h2>What We Offer</h2>
        <div className="features">
          <div className="feature-card">
            <h3>📖 Recipe Booking</h3>
            <p>
              Book and save your favorite recipes anytime, anywhere – ready
              when you are.
            </p>
          </div>
          <div className="feature-card">
            <h3>🍴 Personalized Menus</h3>
            <p>
              Get curated recipes based on your taste, preferences, and dietary
              needs.
            </p>
          </div>
          <div className="feature-card">
            <h3>🌍 Explore Cuisines</h3>
            <p>
              Discover dishes from across the globe, all within one app.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission">
        <h2>Our Mission</h2>
        <p>
          To inspire food lovers everywhere to cook confidently, explore
          creativity, and connect with the joy of delicious meals. At Culinary
          Suite, food isn’t just about taste – it’s about creating memories.
        </p>
      </section>

      {/* Team */}
      <section className="section team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="member">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
            />
            <h3>Ridhi Oberoi</h3>
            <p>Founder & Visionary</p>
          </div>
          <div className="member">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
            />
            <h3>Krish Rajput</h3>
            <p>Lead Developer</p>
          </div>
          <div className="member">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Team Member"
            />
            <h3>Ridhika Verma</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Culinary Suite | All rights reserved</p>
      </footer>
    </div>
  );
};

export default AboutUs;