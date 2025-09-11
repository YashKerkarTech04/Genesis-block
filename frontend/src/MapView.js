import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView({ gps }) {
  if (!gps) return null;

  return (

    <div style={{ height: "600px", width: "full", marginTop: "20px" }}>
  <  MapContainer center={[gps.lat, gps.lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[gps.lat, gps.lng]}>
          <Popup>
            Batch collected here: {gps.lat}, {gps.lng}
          </Popup>
        </Marker>
  </MapContainer>
</div>
  );
}

export default MapView;
