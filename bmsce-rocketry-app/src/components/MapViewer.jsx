import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons missing in React environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// A small sub-component strictly to handle re-centering the map when GPS coords change
function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
}

const MapViewer = ({ lat, lon }) => {
  // Add a fallback just in case data is zero at startup 
  // (using BMSCE approximate coordinates as default)
  const safeLat = lat !== 0 && lat !== undefined ? lat : 12.9410;
  const safeLon = lon !== 0 && lon !== undefined ? lon : 77.5655;

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '8px', zIndex: 1 }}>
      <MapContainer 
        center={[safeLat, safeLon]} 
        zoom={16} 
        style={{ width: '100%', height: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          // =========================================================================
          // HOW TO ADD YOUR QGIS OFFLINE TILES:
          // 1. Export your tiles from QGIS. They usually output as folders of zooming levels: {z}/{x}/{y}.png
          // 2. Place that entire exported folder into bmsce-rocketry-app/public/
          //    (For example: bmsce-rocketry-app/public/bmsce_tiles/)
          // 3. Change the url below to: url="/bmsce_tiles/{z}/{x}/{y}.png"
          // =========================================================================
          
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /* Remove this when you add your QGIS tiles */
          attribution='&copy; OpenStreetMap contributors | QGIS Customized'
        />
        <Marker position={[safeLat, safeLon]}>
          <Popup>Rocket Current Pos</Popup>
        </Marker>
        <RecenterMap lat={safeLat} lon={safeLon} />
      </MapContainer>
    </div>
  );
};

export default MapViewer;