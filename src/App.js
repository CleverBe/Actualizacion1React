import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gestores from './components/gestores';
import Productos from './components/productos';
import Categorias from './components/categorias';
import Login from './components/login';
import CrudLogin from './components/crudlogin';
import MenuLogin from './components/menulogin';
import './css/Login.css';
import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
function App() {
  return (

    <Router>
      
        <Header />
        <Aside />
        
        
        <Routes>
          <Route path="/gestores" element={<Gestores />} />
          <Route path="/producto" element={<Productos />} />
          <Route path="/categoria" element={<Categorias />} />
          <Route path="/" element={<Login />} />
          <Route path="/menulogin" element={<MenuLogin />} />
          <Route path="/crudlogin" element={<CrudLogin />} />
        </Routes>

        <Footer />
    </Router>
  );
}

export default App;