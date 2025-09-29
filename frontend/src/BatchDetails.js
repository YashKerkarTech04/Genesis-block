import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import MapView from "./MapView";
import "./BatchDetails.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function BatchDetails() {
  const { batchId } = useParams();
  const [timeline, setTimeline] = useState(null);
  const [compliance, setCompliance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch timeline data using env variable
        const resTimeline = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/provenance/${batchId}`
        );

        // Fetch timeline data
        if (!resTimeline.ok) throw new Error("Batch not found");
        const timelineData = await resTimeline.json();
        setTimeline(timelineData.timeline);

        // Fetch compliance report data
        const resCompliance = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/compliance/${batchId}`);
        if (!resCompliance.ok) throw new Error("Compliance report not found");
        const complianceData = await resCompliance.json();
        setCompliance(complianceData);

      } catch (err) {
        setTimeline(null);
        setCompliance(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [batchId]);

  // Function to download PDF
  const downloadPDF = () => {
    if (!compliance) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Compliance Report - ${batchId}`, 10, 20);

    let y = 30; // start position

    compliance.entry.forEach((item, index) => {
      const resource = item.resource;

      doc.setFontSize(14);
      doc.text(`Event ${index + 1}: ${resource.resourceType}`, 10, y);
      y += 6;
      doc.setFontSize(12);

      // CollectionEvent
      if (resource.resourceType === "Specimen") {
        doc.text(`ID: ${resource.id}`, 12, y);
        y += 5;
        doc.text(`Collector: ${resource.collection.collector.reference}`, 12, y);
        y += 5;
        doc.text(`Date: ${resource.collection.collectedDateTime}`, 12, y);
        y += 5;
        doc.text(`Method: ${resource.collection.method.text}`, 12, y);
        y += 5;
        doc.text(`Item: ${resource.subject.display}`, 12, y);
        y += 5;
        resource.extension.forEach((ext) => {
          doc.text(`${ext.url}: ${ext.valueString}`, 12, y);
          y += 5;
        });
      }

      // Procedure
      if (resource.resourceType === "Procedure") {
        doc.text(`ID: ${resource.id}`, 12, y);
        y += 5;
        doc.text(`Status: ${resource.status}`, 12, y);
        y += 5;
        doc.text(`Performed By: ${resource.performer.reference}`, 12, y);
        y += 5;
        doc.text(`Performed Date: ${resource.performedDateTime}`, 12, y);
        y += 5;
        resource.note.forEach((note) => {
          doc.text(`Note: ${note.text}`, 12, y);
          y += 5;
        });
      }

      // Observation
      if (resource.resourceType === "Observation") {
        doc.text(`ID: ${resource.id}`, 12, y);
        y += 5;
        doc.text(`Status: ${resource.status}`, 12, y);
        y += 5;
        doc.text(`Test: ${resource.code.text}`, 12, y);
        y += 5;
        doc.text(`Result: ${resource.valueString}`, 12, y);
        y += 5;
        resource.extension.forEach((ext) => {
          doc.text(`${ext.url}: ${ext.valueString}`, 12, y);
          y += 5;
        });
      }

      y += 5;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`${batchId}_compliance_report.pdf`);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="batch-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading batch details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="batch-details-container">
        <div className="batch-header">
          <h1 className="batch-title">Batch Details</h1>
          <p className="batch-id">Batch ID: {batchId}</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {timeline && (
          <div className="timeline-section">
            <div className="section-header">
              <h2>Supply Chain Timeline</h2>
              <p className="section-subtitle">Complete journey of the herbal batch</p>
            </div>

            <div className="timeline-container">
              {timeline.map((event, index) => (
                <div key={index} className="timeline-event">
                  <div className="event-indicator">
                    <div className="event-dot"></div>
                    {index < timeline.length - 1 && <div className="event-line"></div>}
                  </div>
                  <div className="event-content">
                    <div className="event-header">
                      <span className="event-type">{event.type}</span>
                      <span className="event-timestamp">{event.timestamp}</span>
                    </div>
                    <div className="event-details">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Event ID:</span>
                          <span className="detail-value">{event.eventId}</span>
                        </div>
                        
                        {event.type === "CollectionEvent" && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">Collector:</span>
                              <span className="detail-value">{event.collectorId}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Species:</span>
                              <span className="detail-value">{event.species}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">GPS Location:</span>
                              <span className="detail-value">{event.gps.lat}, {event.gps.lng}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">AI Quality Check:</span>
                              <span className="detail-value status-{event.aiQualityCheck.toLowerCase()}">
                                {event.aiQualityCheck}
                              </span>
                            </div>
                            <div className="environment-data">
                              <span className="detail-label">Environmental Data:</span>
                              <div className="env-metrics">
                                <span className="env-metric">🌡️ {event.envData.temperature}°C</span>
                                <span className="env-metric">💧 {event.envData.humidity}%</span>
                                <span className="env-metric">🌱 {event.envData.soilMoisture}%</span>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {event.type === "ProcessingStep" && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">Processor:</span>
                              <span className="detail-value">{event.processorId}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Step:</span>
                              <span className="detail-value">{event.step}</span>
                            </div>
                          </>
                        )}
                        
                        {event.type === "QualityTest" && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">Lab:</span>
                              <span className="detail-value">{event.labId}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Test Type:</span>
                              <span className="detail-value">{event.testType}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Status:</span>
                              <span className={`detail-value status-${event.status.toLowerCase()}`}>
                                {event.status}
                              </span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Report CID:</span>
                              <span className="detail-value code">{event.reportCID}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button
                onClick={downloadPDF}
                className="download-btn"
                disabled={!compliance}
              >
                <span className="btn-icon">📄</span>
                Download Compliance Report
              </button>
            </div>

            {timeline[0]?.gps && (
              <div className="map-section">
                <div className="section-header">
                  <h2>Collection Location</h2>
                  <p className="section-subtitle">GPS coordinates of the harvest site</p>
                </div>
                <MapView gps={timeline[0].gps} />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BatchDetails;