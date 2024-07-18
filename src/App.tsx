import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Checker from './Pages/Checker';
import Driver from './Componentes/moleculas/Drivers';
import EmpleadoFormulario from './Componentes/organismo/EmpleadoFormulario';
import UnidadFormulario from './Componentes/organismo/UnidadFormulario';
import HorarioFormulario from './Componentes/organismo/HorarioFormulario';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checker" element={<Checker />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/empleados" element={<EmpleadoFormulario />} />
        <Route path="/unidad" element={<UnidadFormulario />} />
        <Route path="/horario" element={<HorarioFormulario />} />
      </Routes>
    </Router>
    //ProtectedRouter
  );
};

export default App;
