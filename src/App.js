import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Hola from './components/hola';
import Gestores from './components/gestores';
import Productos from './components/productos';

function App() {
  const baseUrl = "https://localhost:7073/api/gestores";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPost = async () => {
    delete gestorSeleccionado.id;
    gestorSeleccionado.lanzamiento = parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(baseUrl, gestorSeleccionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    gestorSeleccionado.lanzamiento = parseInt(gestorSeleccionado.lanzamiento);
    await axios.put(baseUrl + "/" + gestorSeleccionado.id, gestorSeleccionado)
      .then(response => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map(gestor => {
          if (gestor.id === gestorSeleccionado.id) {
            gestor.nombre = respuesta.nombre;
            gestor.lanzamiento = respuesta.lanzamiento;
            gestor.desarrollador = respuesta.desarrollador;
          }
        });
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + "/" + gestorSeleccionado.id)
      .then(response => {
        setData(data.filter(gestor => gestor.id !== response.data));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const SeleccionarGestor = (gestor, caso) => {
    setGestorSeleccionado(gestor);
    (caso === "Editar") ?
      abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <Router>
      <div className="container">
        <h1>Navbar</h1>
        <hr />
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
