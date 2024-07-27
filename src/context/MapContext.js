// MapContext.js
import React, { createContext, useContext, useState, useRef } from 'react';

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [deviceMarkers, setDeviceMarkers] = useState([]);
  const [buttonColor, setButtonColor] = useState('red');
  const [locationAccessed, setLocationAccessed] = useState(false);

  return (
    <MapContext.Provider value={{ map, setMap, deviceMarkers, setDeviceMarkers, buttonColor, setButtonColor, locationAccessed, setLocationAccessed, mapRef }}>
      {children}
    </MapContext.Provider>
  );
};

const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

export { MapProvider, useMapContext };
