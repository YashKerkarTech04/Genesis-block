// server.js
import express from "express";
import cors from "cors";
import QRCode from "qrcode";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors());

// Example Data (in-memory)
const provenanceTimeline = {
  batchId: "BATCH-ASH-2025-001",
  timeline: [
    {
      type: "CollectionEvent",
      eventId: "EVT-20250909-001",
      collectorId: "COL-001",
      species: "Ashwagandha",
      gps: { lat: 21.25, lng: 85.14 },
      timestamp: "2025-09-09T10:15:00Z",
      aiQualityCheck: "Healthy",
      envData: { temperature: 29.5, humidity: 70, soilMoisture: 24 }
    },
    {
      type: "ProcessingStep",
      eventId: "EVT-20250910-001",
      processorId: "PROC-01",
      step: "Sun-dried for 48 hours",
      timestamp: "2025-09-10T08:00:00Z"
    },
    {
      type: "QualityTest",
      eventId: "EVT-20250911-001",
      labId: "LAB-01",
      testType: "Moisture & Pesticide",
      status: "Pass",
      reportCID: "Qm456xyz...",
      timestamp: "2025-09-11T14:30:00Z"
    }
  ],
  blockchainProof: {
    txHash: "0x5f2d7c8a3a4b91d3e0b7f2a9d1e3c4f6..."
  }
};

const complianceReport = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    {
      resource: {
        resourceType: "Specimen",
        id: "EVT-20250909-001",
        collection: {
          collector: { reference: "Collector/COL-001" },
          collectedDateTime: "2025-09-09T10:15:00Z",
          method: { text: "Hand-picked" }
        },
        subject: { display: "Ashwagandha Leaf" },
        extension: [
          { url: "gps", valueString: "21.25,85.14" },
          { url: "aiQualityCheck", valueString: "Healthy" },
          { url: "photoCID", valueString: "Qm123abc..." }
        ]
      }
    },
    {
      resource: {
        resourceType: "Procedure",
        id: "EVT-20250910-001",
        status: "completed",
        subject: { display: "Batch BATCH-ASH-2025-001" },
        performedDateTime: "2025-09-10T08:00:00Z",
        performer: { reference: "Processor/PROC-01" },
        note: [{ text: "Sun-dried for 48 hours" }]
      }
    },
    {
      resource: {
        resourceType: "Observation",
        id: "EVT-20250911-001",
        status: "final",
        code: { text: "Moisture & Pesticide Test" },
        subject: { display: "Batch BATCH-ASH-2025-001" },
        effectiveDateTime: "2025-09-11T14:30:00Z",
        valueString: "Pass",
        extension: [{ url: "reportCID", valueString: "Qm456xyz..." }]
      }
    }
  ],
  meta: {
    blockchainProof: {
      txHash: "0x5f2d7c8a3a4b91d3e0b7f2a9d1e3c4f6...",
      network: "Polygon Mumbai"
    }
  }
};

// --- 3. Retrieve Provenance Timeline ---
app.get("/api/v1/provenance/:batchId", (req, res) => {
  const { batchId } = req.params;
  if (batchId === provenanceTimeline.batchId) {
    res.json(provenanceTimeline);
  } else {
    res.status(404).json({ error: "Batch not found" });
  }
});

// --- 4. Generate Compliance Report (FHIR-style) ---
app.get("/api/v1/compliance/:batchId", (req, res) => {
  const { batchId } = req.params;
  if (batchId === provenanceTimeline.batchId) {
    res.json(complianceReport);
  } else {
    res.status(404).json({ error: "Batch not found" });
  }
});

// --- 5. Generate QR Code for Batch ---
app.get("/api/v1/qrcode/:batchId", async (req, res) => {
  const { batchId } = req.params;

  try {
    // React frontend page (scan should open this)
    const redirectUrl = `https://genesis-block-iota.vercel.app/batch/${batchId}`;

    // Set response headers for PNG image
    res.setHeader("Content-Type", "image/png");

    // Stream QR PNG directly
    QRCode.toFileStream(res, redirectUrl, {
      type: "png",
      width: 400,     // size of QR code
      margin: 2       // margin around QR
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
