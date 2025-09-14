import React from "react";
import "./Batch.css";

function Batch() {
  const products = [
    {
      name: "Tulsi",
      image: "/images/tulsi.jpg", // place in public/images/
      description:
        "Tulsi is a medicinal herb widely used in Ayurveda for immunity and respiratory health.",
      qr: "/images/tulsi-qr.jpg", // place in public/images/
    },
    {
      name: "Ashwagandha",
      image: "/images/ashwagandha.jpg",
      description:
        "Ashwagandha is an adaptogenic herb known for reducing stress and improving vitality.",
      qr: "/images/ashwagandha-qr.png",
    },
    {
      name: "Neem",
      image: "/images/neem.jpg",
      description:
        "Neem leaves are known for their antibacterial, antifungal, and detoxifying properties.",
      qr: "/images/neem-qr.png",
    },
     {
      name: "Shatavari",
      image: "/images/shatavari.jpg",
      description:
        "Shatavari is known for its benefits in women's health and hormonal balance.",
      qr: "/images/shatavari-qr.png",
    },
  ];

  return (
    <div className="batch-container">
      <h1 className="batch-title">Herbal Batches</h1>

      <div className="batch-grid">
        {products.map((product, index) => (
          <div className="batch-card" key={index}>
            <img src={product.image} alt={product.name} className="product-img" />

            <h2 className="product-name">{product.name}</h2>
            <p className="product-desc">{product.description}</p>

            <button className="buy-btn">Buy</button>

            <div className="qr-section">
              <img src={product.qr} alt="QR Code" className="qr-img" />
              <p className="qr-text">Scan for details</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Batch;
