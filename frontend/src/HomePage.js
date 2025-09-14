import React from "react";
import "./HomePage.css";
import { FaTractor, FaProjectDiagram, FaCheckCircle, FaFileAlt, FaLock, FaLeaf } from "react-icons/fa";

function HomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Ayurveda Traceability</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
        <div className="cta-buttons">
          <button className="login-btn">Login / Register</button>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="hero">
        <div className="welcome">
          <h1>Welcome to Ayurvedic Traceability</h1>
          <p>Ensuring Transparency, Trust, and Sustainability</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="card">
          <FaTractor className="card-icon" />
          <h3>Farmer Empowerment</h3>
          <p>
            Farmers and wild collectors get direct recognition for their work. 
            Our platform ensures:
          </p>
          <ul>
            <li>Fair pricing without middlemen</li>
            <li>Digital identity for each contributor</li>
            <li>Better market access through blockchain records</li>
          </ul>
        </div>

        <div className="card">
          <FaProjectDiagram className="card-icon" />
          <h3>Supply Chain Transparency</h3>
          <p>Every herb’s journey is tracked step by step using blockchain:</p>
          <ul>
            <li>Geo-tagged collection at the source</li>
            <li>Real-time updates during processing</li>
            <li>Immutable blockchain records for each stage</li>
          </ul>
        </div>

        <div className="card">
          <FaCheckCircle className="card-icon" />
          <h3>Consumer Trust</h3>
          <p>Consumers get the confidence of knowing the true origin of their products:</p>
          <ul>
            <li>Unique QR codes for each herbal batch</li>
            <li>Instant verification of authenticity & quality</li>
            <li>Transparency from farm to formulation</li>
          </ul>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <FaFileAlt className="card-icon" />
          <h3>Regulatory Compliance</h3>
          <p>Our system provides easy-to-access compliance data for regulators:</p>
          <ul>
            <li>Standardized lab test reports</li>
            <li>Verified collection and processing records</li>
            <li>Audit-ready blockchain proof</li>
          </ul>
        </div>

        <div className="card">
          <FaLock className="card-icon" />
          <h3>Data Security</h3>
          <p>Data integrity is maintained using blockchain features:</p>
          <ul>
            <li>Tamper-proof digital ledgers</li>
            <li>Decentralized validation of records</li>
            <li>Privacy of farmer and consumer data</li>
          </ul>
        </div>

        <div className="card">
          <FaLeaf className="card-icon" />
          <h3>Sustainability</h3>
          <p>Encouraging eco-friendly and responsible sourcing practices:</p>
          <ul>
            <li>Geo-tagging ensures ethical collection zones</li>
            <li>Reduces over-harvesting of endangered herbs</li>
            <li>Promotes long-term herbal biodiversity</li>
          </ul>
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
