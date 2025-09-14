import React, { useState, useEffect } from "react";
import "./HomePage.css";
import {
  FaTractor,
  FaProjectDiagram,
  FaCheckCircle,
  FaFileAlt,
  FaLock,
  FaLeaf,
  FaBars,
  FaTimes,
  FaChevronDown
} from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading Ayurveda Traceability...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Ayurveda Traceability</div>

        {/* Hamburger icon (mobile only) */}
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>Home</li>
          <li>About</li>
          <li className="dropdown" onClick={toggleDropdown}>
            Features <FaChevronDown className="dropdown-arrow" />
            <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
              <li>
                <Link to="/batch" onClick={() => setMenuOpen(false)}>Herbal Batches</Link>
              </li>
              <li>Traceability Map</li>
              <li>Blockchain Records</li>
            </ul>
          </li>
          <li>Contact</li>
        </ul>
        <div className="cta-buttons">
          <button className="login-btn">Login / Register</button>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="hero">
        <div className="welcome">
          <h1>Welcome to Ayurveda Traceability</h1>
          <p>Ensuring Transparency, Trust, and Sustainability</p>
          <button className="explore-btn">Explore Now</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="card">
          <div className="card-icon-container">
            <FaTractor className="card-icon" />
          </div>
          <h3>Farmer Empowerment</h3>
          <div className="underline"></div>
          <p>Farmers and wild collectors get direct recognition for their work.</p>
          <ul>
            <li>Fair pricing without middlemen</li>
            <li>Digital identity for each contributor</li>
            <li>Better market access through blockchain records</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-icon-container">
            <FaProjectDiagram className="card-icon" />
          </div>
          <h3>Supply Chain Transparency</h3>
          <div className="underline"></div>
          <p>Every herb's journey is tracked step by step using blockchain:</p>
          <ul>
            <li>Geo-tagged collection at the source</li>
            <li>Real-time updates during processing</li>
            <li>Immutable blockchain records for each stage</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-icon-container">
            <FaCheckCircle className="card-icon" />
          </div>
          <h3>Consumer Trust</h3>
          <div className="underline"></div>
          <p>Consumers get the confidence of knowing the true origin:</p>
          <ul>
            <li>Unique QR codes for each herbal batch</li>
            <li>Instant verification of authenticity & quality</li>
            <li>Transparency from farm to formulation</li>
          </ul>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <div className="card-icon-container">
            <FaFileAlt className="card-icon" />
          </div>
          <h3>Regulatory Compliance</h3>
          <div className="underline"></div>
          <p>Our system provides easy-to-access compliance data:</p>
          <ul>
            <li>Standardized lab test reports</li>
            <li>Verified collection and processing records</li>
            <li>Audit-ready blockchain proof</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-icon-container">
            <FaLock className="card-icon" />
          </div>
          <h3>Data Security</h3>
          <div className="underline"></div>
          <p>Data integrity is maintained using blockchain features:</p>
          <ul>
            <li>Tamper-proof digital ledgers</li>
            <li>Decentralized validation of records</li>
            <li>Privacy of farmer and consumer data</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-icon-container">
            <FaLeaf className="card-icon" />
          </div>
          <h3>Sustainability</h3>
          <div className="underline"></div>
          <p>Encouraging eco-friendly and responsible sourcing practices:</p>
          <ul>
            <li>Geo-tagging ensures ethical collection zones</li>
            <li>Reduces over-harvesting of endangered herbs</li>
            <li>Promotes long-term herbal biodiversity</li>
          </ul>
        </div>
      </section>

      {/* ✅ AYUSH Government Section */}
      <section className="ayush-section">
        <div className="ayush-image">
          <img src="/images/ayush.jpg" alt="AYUSH Government Logo" />
        </div>
        <div className="ayush-info">
          <h2>Supported by Ministry of AYUSH</h2>
          <p>
            This project is inspired by the Problem Statement given by the Ministry of AYUSH, Government of India.
            The goal is to ensure complete <strong>traceability of Ayurvedic herbs</strong> from farmers and collectors to the
            final Ayurvedic formulations, ensuring transparency, safety, and authenticity for consumers.
          </p>
          <p>
            With this system, India strengthens its heritage of Ayurveda while
            ensuring global trust in the quality and authenticity of its herbal supply chain.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Ayurveda Traceability Project | Team Genesis Blockers</p>
      </footer>
    </div>
  );
}

export default HomePage;