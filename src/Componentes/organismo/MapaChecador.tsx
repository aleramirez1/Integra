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
            { lat: 16.61499822993647, lng: -93.09168841669339 },
            { lat: 16.61783442568243, lng: -93.09497707754001 },
            { lat: 16.618779814953527, lng: -93.09826573838663 },
            { lat: 16.618149555956766, lng: -93.09991006880993 },
            { lat: 16.620985705146364, lng: -93.09991006880993 },
            { lat: 16.622876447991274, lng: -93.09958120272526 },
            { lat: 16.624136932872783, lng: -93.09859460447127 },
            { lat: 16.626027644671016, lng: -93.0992523366406 },
            { lat: 16.630439233078352, lng: -93.09892347055593 },
            { lat: 16.633590305540118, lng: -93.09464821145534 },
            { lat: 16.63422051382009, lng: -93.09234614886272 },
            { lat: 16.641152668201098, lng: -93.09201728277804 },
            { lat: 16.643673389465537, lng: -93.09168841669339 },
            { lat: 16.643673389465537, lng: -93.09530594362467 },
            { lat: 16.644933737666044, lng: -93.09563480970931 },
            { lat: 16.64682424442557, lng: -93.10023893489459 },
            { lat: 16.64461865139294, lng: -93.10254099748722 },
            { lat: 16.643673389465537, lng: -93.10385646182586 },
            { lat: 16.641782851624956, lng: -93.10648739050315 },
            { lat: 16.644303564601827, lng: -93.11043378351907 },
            { lat: 16.6452488234211, lng: -93.1127358461117 },
            { lat: 16.64556390865812, lng: -93.11733997129696 },
            { lat: 16.64682424442557, lng: -93.11964203388959 },
            { lat: 16.648399652477856, lng: -93.12589048949813 },
            { lat: 16.650605201989354, lng: -93.12589048949813 },
            { lat: 16.653125798910857, lng: -93.13016574859876 },
            { lat: 16.65879702070453, lng: -93.13674307029197 },
            { lat: 16.663522910559944, lng: -93.1397028650539 },
            { lat: 16.66635838847204, lng: -93.14332039198518 },
            { lat: 16.66761858739354, lng: -93.14759565108578 },
            { lat: 16.667933635827282, lng: -93.1508843119324 },
            { lat: 16.670454004624496, lng: -93.154172972779 },
            { lat: 16.673919457511705, lng: -93.15680390145629 },
            { lat: 16.67517960663357, lng: -93.1600925623029 },
            { lat: 16.678329943116317, lng: -93.16305235706487 },
            { lat: 16.681795253307786, lng: -93.16535441965748 },
            { lat: 16.68526050069427, lng: -93.1669987500808 },
            { lat: 16.68778064115734, lng: -93.1702874109274 },
            { lat: 16.690930770006393, lng: -93.17226060743536 },
            { lat: 16.69219080700606, lng: -93.17489153611265 },
            { lat: 16.695970868146674, lng: -93.17620700045131 },
            { lat: 16.698826986678537, lng: -93.18166609006164 },
            { lat: 16.700618775935023, lng: -93.18120417483776 },
            { lat: 16.70373402313539, lng: -93.18228832933784 },
            { lat: 16.70633002364269, lng: -93.18012002033765 },
            { lat: 16.70814720299349, lng: -93.17822274996249 },
            { lat: 16.71204110048943, lng: -93.17768067271244 },
            { lat: 16.714117813334152, lng: -93.17578340233727 },
            { lat: 16.71827117121361, lng: -93.17551236371226 },
            { lat: 16.721126552300575, lng: -93.1736150933371 },
            { lat: 16.723722316192962, lng: -93.172530938837 },
            { lat: 16.726577615663242, lng: -93.1714467843369 },
            { lat: 16.72709675642751, lng: -93.16873639808666 },
            { lat: 16.730730702193718, lng: -93.16873639808666 },
            { lat: 16.73172075164326, lng: -93.16828024684433 },
            { lat: 16.735730474148912, lng: -93.16749517873832 },
            { lat: 16.738737710657002, lng: -93.16618673189498 },
            { lat: 16.741995496639316, lng: -93.16540166378898 },
            { lat: 16.744752041257506, lng: -93.16409321694562 },
            { lat: 16.748761489473942, lng: -93.16383152757696 },
            { lat: 16.751517936145135, lng: -93.16383152757696 },
            { lat: 16.750766181920287, lng: -93.16121463389027 },
            { lat: 16.751016766991764, lng: -93.15859774020358 },
            { lat: 16.750766181920287, lng: -93.15519577841089 },
            { lat: 16.749763838335838, lng: -93.15257888472419 },
            { lat: 16.749763838335838, lng: -93.14996199103751 },
            { lat: 16.749513251615117, lng: -93.14708340798215 },
            { lat: 16.74775913533489, lng: -93.1449898930328 },
            { lat: 16.74775913533489, lng: -93.1415879312401 },
            { lat: 16.746756775918946, lng: -93.14106455250277 },
            { lat: 16.746005002894197, lng: -93.13844765881608 },
            { lat: 16.74575441122639, lng: -93.13583076512938 },
            { lat: 16.745253226901482, lng: -93.13347556081138 },
            { lat: 16.7445014479409, lng: -93.13085866712468 },
            { lat: 16.743749666012583, lng: -93.127456705332 },
            { lat: 16.742246093253218, lng: -93.12510150101396 },
            { lat: 16.746756775918946, lng: -93.12588656911996 },
            { lat: 16.746756775918946, lng: -93.12300798606461 },
            { lat: 16.747257956286507, lng: -93.12091447111526 },
            { lat: 16.746756775918946, lng: -93.11960602427192 },
            { lat: 16.746005002894197, lng: -93.11751250932257 }
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

  const handleActivateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`);
        },
        (error) => {
          alert('Error al obtener la localización: ' + error.message);
        }
      );
    } else {
      alert('Geolocalización no soportada por este navegador.');
    }
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
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleActivateLocation}
          style={{ padding: '10px 20px', backgroundColor: '#2d4d6c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Activar Localización
        </button>
      </div>
    </div>
  );
};

export default MapaChecador;
