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
import ProtectedRoute from './Componentes/ProtectedRoute';
import BitacoraCheck from './Componentes/organismo/BitacoraCheck';
import MenuCheck from './Pages/MenuCheck';
import MapaChecador from './Componentes/organismo/MapaChecador';

const App: React.FC = () => {
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<Admin />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/checker" 
          element={<ProtectedRoute element={<Checker />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/driver" 
          element={<ProtectedRoute element={<Driver />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/empleados" 
          element={<ProtectedRoute element={<EmpleadoFormulario />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/unidad" 
          element={<ProtectedRoute element={<UnidadFormulario />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/bita" 
          element={<ProtectedRoute element={<BitacoraCheck />} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/menucheck" 
          element={<ProtectedRoute element={<MenuCheck/>} isAuthenticated={isAuthenticated} />} 
        />
        <Route 
          path="/mapa" 
          element={<ProtectedRoute element={<MapaChecador/>} isAuthenticated={isAuthenticated} />} 
        />
        
        <Route 
          path="/horario" 
          element={<ProtectedRoute element={<HorarioFormulario />} isAuthenticated={isAuthenticated} />} 
        />
        
      </Routes>
    </Router>
  );
};

export default App;
