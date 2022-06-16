import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hola from './components/hola';
import Gestores from './components/gestores';
import Productos from './components/productos';

function App() {
  return (
    <Router>
      <div className="container">        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="/producto">Productos</a>
              <a className="nav-item nav-link" href="/hola">Hola</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/hola" element={<Hola />} />
          <Route path="/gestores" element={<Gestores />} />
          <Route path="/producto" element={<Productos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
