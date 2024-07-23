import React, { useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapaChecador: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        if (mapRef.current) {
          const google = (window as any).google;
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 16.75, lng: -93.1167 },
            zoom: 12,
          });

          const rutaCoords = [
            { lat: 16.55, lng: -93.1159 }, // suchi
            { lat: 16.75, lng: -93.1167 }, // tux
          ];

          const ruta = new google.maps.Polyline({
            path: rutaCoords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });

          ruta.setMap(map);
        }
      };
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'relative', height: '10px', marginBottom: '17px' }}>
        <h2
          style={{
            position: 'absolute',
            top: '10px', 
            right: '530px', 
            color: '#2d4d6c',
            marginBottom: '0px',
            textAlign: 'right', 
          }}
        >
          Suchiapa - Vía Terán
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
        <div style={{ marginBottom: '10px' }}>
          <img
            src="/logo-removebg-preview.png" 
            alt="Logo"
            style={{ marginBottom: '-40px', width: '150px', height: '150px' }} 
          />
        </div>
        <div>
          <label htmlFor="rutas" style={{ marginRight: '20px' }}>
            Rutas:
          </label>
          <select id="rutas" name="rutas" defaultValue="Vía Terán" style={{ marginRight: '20px', padding: '5px' }}>
            <option value="Vía Terán">Vía Terán</option>
            {}
          </select>
          <label htmlFor="modo" style={{ marginRight: '10px' }}>
            Modo:
          </label>
          <select id="modo" name="modo" defaultValue="Transporte público" style={{ padding: '5px' }}>
            <option value="Transporte público">Transporte público</option>
            {}
          </select>
        </div>
      </div>
      <div
        ref={mapRef}
        style={{ width: '96%', height: '550px', border: '1px solid green', margin: '0 auto' }}
      />
      <div style={{ marginTop: '10px' }}>
        <img
          src="https://via.placeholder.com/468x60?text=Dr.+José+Domingo+Martínez+Mogu"
          alt="Publicidad"
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

export default MapaChecador;
