import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapaChecador: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [buttonColor, setButtonColor] = useState('red');
  const [locationAccessed, setLocationAccessed] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        if (mapRef.current) {
          const google = (window as any).google as typeof google.maps;
          if (google) {
            const mapInstance = new google.maps.Map(mapRef.current, {
              center: { lat: 16.75, lng: -93.1167 },
              zoom: 12,
            });
            setMap(mapInstance);
          } else {
            console.error('Google Maps no está disponible.');
          }
        }
      };
      script.onerror = () => {
        console.error('Error al cargar el script de Google Maps.');
      };
    };

    loadGoogleMapsScript();
  }, []);

  const handleActivateLocation = () => {
    if (locationAccessed) {
      Swal.fire({
        title: 'Información',
        text: 'La ubicación ya ha sido accedida.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Desactivar',
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Desactivar
          if (marker) {
            marker.setMap(null);
            setMarker(null);
          }
          setButtonColor('red');
          setLocationAccessed(false);
        }
      });
      return;
    }

    Swal.fire({
      title: 'Permiso de Ubicación',
      text: '¿Deseas permitir el acceso a tu ubicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;

              if (map) {
                const google = (window as any).google as typeof google.maps;

                if (google) {
                  if (marker) {
                    marker.setPosition(new google.maps.LatLng(latitude, longitude));
                  } else {
                    const newMarker = new google.maps.Marker({
                      position: new google.maps.LatLng(latitude, longitude),
                      map: map,
                      title: 'Tu ubicación actual',
                    });
                    setMarker(newMarker);
                  }

                  map.setCenter(new google.maps.LatLng(latitude, longitude));
                  setButtonColor('green'); // Cambiar color a verde
                  setLocationAccessed(true); // Marcar como accedida
                } else {
                  console.error('Google Maps no está disponible.');
                }
              }
            },
            (error) => {
              console.error('Error al obtener la localización:', error.message);
              Swal.fire('Error', 'Error al obtener la localización. Por favor, asegúrate de haber permitido el acceso a la ubicación.', 'error');
              setButtonColor('red'); // Cambiar color a rojo
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 5000,
            }
          );
        } else {
          Swal.fire('Error', 'Geolocalización no soportada por este navegador.', 'error');
          setButtonColor('red'); // Cambiar color a rojo
        }
      } else {
        Swal.fire('Acceso Denegado', 'Acceso a la ubicación denegado.', 'info');
        setButtonColor('red'); // Cambiar color a rojo
      }
    });
  };

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
            {/* Agregar más opciones aquí si es necesario */}
          </select>
          <label htmlFor="modo" style={{ marginRight: '10px' }}>
            Modo:
          </label>
          <select id="modo" name="modo" defaultValue="Transporte público" style={{ padding: '5px' }}>
            <option value="Transporte público">Transporte público</option>
            {/* Agregar más opciones aquí si es necesario */}
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
      <button
        onClick={handleActivateLocation}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: buttonColor,
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Activar Localización
      </button>
    </div>
  );
};

export default MapaChecador;
