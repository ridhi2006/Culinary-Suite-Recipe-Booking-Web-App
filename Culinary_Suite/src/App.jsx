import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import About from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import NewRecipe from "./pages/NewRecipe";
import Profile from "./pages/Profile";
import Bookmark from "./pages/Bookmark";

/* Optional: scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* Optional: simple 404 page */
function NotFound() {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1>404 — Page not found</h1>
      <p>The page you’re looking for does not exist.</p>
      <a href="/mainpage">Go to MainPage</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main content */}
        <Route path="/mainpage" element={<MainPage />} />
        {/* Alias to handle accidental uppercase navigations */}
        <Route path="/MainPage" element={<Navigate to="/mainpage" replace />} />

        {/* Other pages */}
        <Route path="/aboutus" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/newrecipe" element={<NewRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmark" element={<Bookmark />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
