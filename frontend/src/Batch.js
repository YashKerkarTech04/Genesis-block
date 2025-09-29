import React, { useState } from "react";
import "./Batch.css";
import { FaShoppingCart, FaShoppingBag, FaQrcode, FaLeaf } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Batch() {
  const [activeTab, setActiveTab] = useState("all");
  
  const products = [
    {
      name: "Tulsi",
      image: "/images/tulsi.jpg",
      description:
        "Tulsi is a medicinal herb widely used in Ayurveda for immunity and respiratory health.",
      qr: "/images/tulsi-qr.jpg",
      category: "immunity",
      origin: "Himalayan Foothills",
      harvestDate: "2023-10-15",
      certification: "Organic Certified"
    },
    {
      name: "Ashwagandha",
      image: "/images/ashwagandha.jpg",
      description:
        "Ashwagandha is an adaptogenic herb known for reducing stress and improving vitality.",
      qr: "/images/tulsi-qr.jpg",
      category: "vitality",
      origin: "Madhya Pradesh",
      harvestDate: "2023-09-22",
      certification: "Organic Certified"
    },
    {
      name: "Neem",
      image: "/images/neem.jpg",
      description:
        "Neem leaves are known for their antibacterial, antifungal, and detoxifying properties.",
      qr: "/images/tulsi-qr.jpg",
      category: "skincare",
      origin: "Tamil Nadu",
      harvestDate: "2023-11-05",
      certification: "Wild Harvested"
    },
    {
      name: "Shatavari",
      image: "/images/shatavari.jpg",
      description:
        "Shatavari is known for its benefits in women's health and hormonal balance.",
      qr: "/images/tulsi-qr.jpg",
      category: "wellness",
      origin: "Rajasthan",
      harvestDate: "2023-08-30",
      certification: "Organic Certified"
    },
    {
      name: "Turmeric",
      image: "/images/turmeric.jpg",
      description:
        "Turmeric contains curcumin, a powerful anti-inflammatory compound and antioxidant.",
      qr: "/images/tulsi-qr.jpg",
      category: "immunity",
      origin: "Kerala",
      harvestDate: "2023-10-28",
      certification: "Organic Certified"
    },
    {
      name: "Amla",
      image: "/images/amla.jpg",
      description:
        "Amla is rich in Vitamin C and antioxidants, supporting immunity and healthy skin.",
      qr: "/images/tulsi-qr.jpg",
      category: "immunity",
      origin: "Uttar Pradesh",
      harvestDate: "2023-09-10",
      certification: "Wild Harvested"
    }
  ];

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.category === activeTab);

  return (
    <>
    <Navbar/>
      <div className="batch-container">
      <div className="nav-placeholder"></div>
      
      <div className="batch-header">
        <h1 className="batch-title">
          <FaLeaf className="title-icon" />
          Herbal Batches
        </h1>
        <div className="underline"></div>
        <p className="batch-intro">
          Explore our range of Ayurvedic herbs with complete traceability from
          source to shelf. Scan the QR codes for detailed provenance and
          compliance information.
        </p>
      </div>

      <div className="category-tabs">
        <button 
          className={activeTab === "all" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("all")}
        >
          All Herbs
        </button>
        <button 
          className={activeTab === "immunity" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("immunity")}
        >
          Immunity Boosters
        </button>
        <button 
          className={activeTab === "vitality" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("vitality")}
        >
          Vitality & Energy
        </button>
        <button 
          className={activeTab === "skincare" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("skincare")}
        >
          Skin Care
        </button>
        <button 
          className={activeTab === "wellness" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("wellness")}
        >
          Women's Wellness
        </button>
      </div>

      <div className="batch-grid">
        {filteredProducts.map((product, index) => (
          <div className="batch-card" key={index}>
            <div className="card-badge">{product.certification}</div>
            
            <div className="image-container">
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="image-overlay">
                <button className="view-details-btn">Quick View</button>
              </div>
            </div>

            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-origin">
                <span className="origin-label">Origin:</span> {product.origin}
              </div>
              <p className="product-desc">{product.description}</p>
              
              <div className="harvest-info">
                <span className="harvest-date">Harvested: {product.harvestDate}</span>
              </div>
            </div>

            <div className="button-group">
              <button className="cart-btn">
                <FaShoppingCart className="btn-icon" />
                Add to Cart
              </button>
              <button className="buy-btn">
                <FaShoppingBag className="btn-icon" />
                Buy Now
              </button>
            </div>

            <div className="qr-section">
              <div className="qr-header">
                <FaQrcode className="qr-icon" />
                <span>Traceability QR Code</span>
              </div>
              <img src={product.qr} alt="QR Code" className="qr-img" />
              <p className="qr-text">Scan for origin & quality details</p>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found in this category</h3>
          <p>Try selecting a different category or check back later for new arrivals.</p>
        </div>
      )}
    </div>

    <Footer/>
    </>
  );
}

export default Batch;