import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const BitacoraCheck = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
    Swal.fire({
      title: 'Map Loaded',
      text: 'Google Maps has loaded successfully!',
      icon: 'success',
    });
  };

  const handleMapError = (error) => {
    Swal.fire({
      title: 'Error',
      text: `Google Maps failed to load: ${error.message}`,
      icon: 'error',
    });
  };

  return (
    <div>
      <h1>Bitacora Check</h1>
      <LoadScript
        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Reemplaza con tu API key de Google Maps
        onLoad={handleMapLoad}
        onError={handleMapError}
      >
        <MapContainer>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 19.432608, lng: -99.133209 }} // Coordenadas del centro del mapa (CDMX)
            zoom={10}
          >
            <Marker position={{ lat: 19.432608, lng: -99.133209 }} />
          </GoogleMap>
        </MapContainer>
      </LoadScript>
    </div>
  );
};

export default BitacoraCheck;
