import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Checker from './Pages/MenuCheck';
import Driver from './Componentes/moleculas/Drivers';
import EmpleadoFormulario from './Componentes/organismo/EmpleadoFormulario';
import UnidadFormulario from './Componentes/organismo/UnidadFormulario';
import HorarioFormulario from './Componentes/organismo/HorarioFormulario';
import BitacoraCheck from './Componentes/organismo/BitacoraCheck';
import MenuCheck from './Pages/MenuCheck';
import MapaChecador from './Componentes/organismo/MapaChecador';
import { MapProvider } from './context/MapContext'; // Importar el proveedor

const App: React.FC = () => {
  const isAuthenticated = true;

  return (
    <MapProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin /> : <Login />} 
          />
          <Route 
            path="/checker" 
            element={isAuthenticated ? <Checker /> : <Login />} 
          />
          <Route 
            path="/driver" 
            element={isAuthenticated ? <Driver /> : <Login />} 
          />
          <Route 
            path="/empleados" 
            element={isAuthenticated ? <EmpleadoFormulario /> : <Login />} 
          />
          <Route 
            path="/unidad" 
            element={isAuthenticated ? <UnidadFormulario /> : <Login />} 
          />
          <Route 
            path="/bita" 
            element={isAuthenticated ? <BitacoraCheck /> : <Login />} 
          />
          <Route 
            path="/menucheck" 
            element={isAuthenticated ? <MenuCheck /> : <Login />} 
          />
          <Route 
            path="/mapa" 
            element={isAuthenticated ? <MapaChecador /> : <Login />} 
          />
          <Route 
            path="/horario" 
            element={isAuthenticated ? <HorarioFormulario /> : <Login />} 
          />
        </Routes>
      </Router>
    </MapProvider>
  );
};

export default App;
