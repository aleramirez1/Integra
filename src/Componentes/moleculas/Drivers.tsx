import React from 'react';
import { useMapContext } from '../../context/MapContext';

const Drivers: React.FC = () => {

  const { map, deviceMarkers, buttonColor, locationAccessed } = useMapContext();

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Driver Dashboard</h1>
      <p>Welcome, Driver!</p>

      <div style={{ marginTop: '20px' }}>
        <h2>Map Status</h2>
        <p><strong>Map Initialized:</strong> {map ? 'Yes' : 'No'}</p>
        <p><strong>Number of Device Markers:</strong> {deviceMarkers.length}</p>
        <p><strong>Button Color:</strong> {buttonColor}</p>
        <p><strong>Location Accessed:</strong> {locationAccessed ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default Drivers;
