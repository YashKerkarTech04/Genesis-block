import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">AyushChain</div>

      {/* Hamburger icon (mobile only) */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
             <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li onClick={closeMenu}>About</li>
        <li className="dropdown" onClick={toggleDropdown}>
          Features <FaChevronDown className="dropdown-arrow" />
          <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            <li>
              <Link to="/Batch" onClick={closeMenu}>Herbal Batches</Link>
            </li>
            <li onClick={closeMenu}>Traceability Map</li>
            <li onClick={closeMenu}>Blockchain Records</li>
          </ul>
        </li>
        <li onClick={closeMenu}>Contact</li>
      </ul>
      <div className="cta-buttons">
        <button className="login-btn">Login / Register</button>
      </div>
    </nav>
  );
}

export default Navbar;