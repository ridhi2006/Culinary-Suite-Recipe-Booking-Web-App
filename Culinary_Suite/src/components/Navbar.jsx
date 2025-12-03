// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

/**
 * Props:
 *  - vegFilter: "all" | "veg"
 *  - onVegFilterChange: (val: "all" | "veg") => void
 *  - onSearchChange?: (val: string) => void
 */
const Navbar = ({ vegFilter = "all", onVegFilterChange, onSearchChange }) => {
  const [vegToggle, setVegToggle] = useState(false);
  const [selectedVegOption, setSelectedVegOption] = useState("all");
  const [showVegDropdown, setShowVegDropdown] = useState(false);

  // (Dropdown removed for avatar since we navigate on click)
  const vegDropdownRef = useRef(null);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const toFilterValue = (option, toggleOn) =>
    toggleOn && option === "pure" ? "veg" : "all";

  useEffect(() => {
    const isVeg = vegFilter === "veg";
    setVegToggle(isVeg);
    setSelectedVegOption(isVeg ? "pure" : "all");
  }, [vegFilter]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (vegDropdownRef.current && !vegDropdownRef.current.contains(e.target)) {
        setShowVegDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleVegToggle = (e) => {
    const checked = e.target.checked;
    setVegToggle(checked);
    setShowVegDropdown(checked);
    const filterValue = toFilterValue(selectedVegOption, checked);
    onVegFilterChange?.(filterValue);
  };

  const applySelection = (e) => {
    e?.preventDefault?.();
    const filterValue = toFilterValue(selectedVegOption, vegToggle);
    onVegFilterChange?.(filterValue);
    setShowVegDropdown(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearchChange?.(val);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchChange?.(searchQuery.trim());
  };

  // read avatar from localStorage (fallback to default)
  const avatarSrc = localStorage.getItem("profileAvatar") || "/profile-avatar.jpg";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/logo.jpg" alt="Logo" className="logo" />
        <h2 className="brand">Culinary Suite</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/Pricing">Pricing</Link></li>
        <li><Link to="/NewRecipe">Add Recipe</Link></li>
        </ul>

      <div className="nav-right">
        {/* Search — active */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">🔍</button>
        </form>

        {/* —— VEG MODE —— */}
        <div className="veg-container" ref={vegDropdownRef}>
          <p
            id="vegModeText"
            style={{
              color: selectedVegOption === "pure" && vegToggle ? "green" : "orange",
            }}
          >
            VEG MODE
          </p>

          <label className="switch">
            <input type="checkbox" checked={vegToggle} onChange={handleVegToggle} />
            <span className="slider"></span>
          </label>

          {showVegDropdown && (
            <div className="dropdown" id="vegDropdown">
              <h4>Filter Veg Dishes</h4>

              <label>
                <input
                  type="radio"
                  name="vegOption"
                  value="all"
                  checked={selectedVegOption === "all"}
                  onChange={() => {
                    setSelectedVegOption("all");
                    if (vegToggle) onVegFilterChange?.("all");
                  }}
                />
                All Dishes
              </label>

              <label>
                <input
                  type="radio"
                  name="vegOption"
                  value="pure"
                  checked={selectedVegOption === "pure"}
                  onChange={() => {
                    setSelectedVegOption("pure");
                    if (vegToggle) onVegFilterChange?.("veg");
                  }}
                />
                Pure Veg
              </label>

              <button type="button" onClick={applySelection}>Apply</button>
            </div>
          )}
        </div>

        {/* Avatar -> Profile page */}
        <div className="user-menu">
          <Link to="/Profile" title="Open your profile">
            <img src={avatarSrc} alt="User Avatar" className="user-avatar" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
