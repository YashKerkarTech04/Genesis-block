import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
//import autoTable from "jspdf-autotable";
import MapView from "./MapView";


function BatchDetails() {
  const { batchId } = useParams();
  const [timeline, setTimeline] = useState(null);
  const [compliance, setCompliance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
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

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      {timeline && (
        <>
          <table className="border-collapse border border-gray-300 w-full mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Event Type</th>
                <th className="border p-2">Event ID</th>
                <th className="border p-2">Timestamp</th>
                <th className="border p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((event, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{event.type}</td>
                  <td className="border p-2">{event.eventId}</td>
                  <td className="border p-2">{event.timestamp}</td>
                  <td className="border p-2 text-left">
                    {event.type === "CollectionEvent" && (
                      <>
                        <p>Collector: {event.collectorId}</p>
                        <p>Species: {event.species}</p>
                        <p>GPS: {event.gps.lat}, {event.gps.lng}</p>
                        <p>AI Quality: {event.aiQualityCheck}</p>
                        <p>Env Data: Temp {event.envData.temperature}°C, Humidity {event.envData.humidity}%, Soil Moisture {event.envData.soilMoisture}%</p>
                      </>
                    )}
                    {event.type === "ProcessingStep" && (
                      <>
                        <p>Processor: {event.processorId}</p>
                        <p>Step: {event.step}</p>
                      </>
                    )}
                    {event.type === "QualityTest" && (
                      <>
                        <p>Lab: {event.labId}</p>
                        <p>Test Type: {event.testType}</p>
                        <p>Status: {event.status}</p>
                        <p>Report CID: {event.reportCID}</p>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download Compliance Report
          </button>
         {timeline && timeline[0].gps && <MapView gps={timeline[0].gps} />}

        </>
      )}
    </div>
  );
}

export default BatchDetails;
