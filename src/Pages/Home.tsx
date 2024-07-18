import React from 'react';
import { Link } from 'react-router-dom';
import ImageBubble from '../Componentes/atomos/ImageBubble';
import Button from '../Componentes/atomos/Button';

const Home: React.FC = () => {
  const handleButtonClick = () => {
    console.log('Botón clickeado');
  };

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div style={{ marginTop: '7rem', marginLeft: '35rem' }}>
          <ImageBubble
            imageSrc="/conv-unscreen.gif"
            imageAlt="GIF de Ejemplo"
            text="¡Bienvenido a TransportCommunication!
              Tu plataforma de confianza para gestionar rutas via Teran de manera eficiente y segura.
              Accede con tu usuario y explora todas las funcionalidades diseñadas para facilitar tu experiencia de transporte colectivo.
              ¡Prepárate para un viaje sin complicaciones!"
          />
        </div>
        <div style={{ marginTop: '2rem', marginLeft: '46rem' }}>
          <Link to="/login">
            <Button onClick={handleButtonClick}>
              Haz clic aquí
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
