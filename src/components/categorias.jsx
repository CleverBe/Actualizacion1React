import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../App.css';

function App() {
  const baseUrl = "https://localhost:7073/api/categoria";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [categSeleccionado, setCategoriaSeleccionado] = useState({
    id: '',
    nombre: '',
    estado: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setCategoriaSeleccionado({
      ...categSeleccionado,
      [name]: value
    });
    console.log(categSeleccionado);
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
    delete categSeleccionado.id;
    await axios.post(baseUrl, categSeleccionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    await axios.put(baseUrl + "/" + categSeleccionado.id, categSeleccionado)
      .then(response => {
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map(categ => {
          if (categ.id === categSeleccionado.id) {
            categ.nombre = respuesta.nombre;
            categ.estado = respuesta.estado;
          }
        });
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + "/" + categSeleccionado.id)
      .then(response => {
        setData(data.filter(categ=>categ.id !== response.data));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const SeleccionarCategoria = (categ, caso) => {
    setCategoriaSeleccionado(categ);
    (caso === "Editar") ?
      abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div className="App">
      <br></br>
      <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success">Insertar Nuevo</button>
      <br></br>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(categ => (
            <tr key={categ.id}>
              <td>{categ.id}</td>
              <td>{categ.nombre}</td>
              <td>{categ.estado}</td>
              <td>
                <button className='btn btn-primary' onClick={() => SeleccionarCategoria(categ, "Editar")}>Editar</button> {"  "}
                <button className='btn btn-danger' onClick={() => SeleccionarCategoria(categ, "Eliminar")}>Elimar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Categoria</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nombre: </label>
            <br />
            <input type="text" className='form-group' name="nombre" onChange={handleChange} />
            <br />
            <label>Estado: </label>
            <br />
            <input type="text" className='form-group' name="estado" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className='btn btn-primary' onClick={() => peticionPost()} >Insertar</Button>{"  "}
          <Button className='btn btn-danger' onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Categoria</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <br />
            <input type="text" className='form-group' readOnly value={categSeleccionado && categSeleccionado.id} />
            <br />
            <label>Nombre: </label>
            <br />
            <input type="text" className='form-group' name='nombre' onChange={handleChange} value={categSeleccionado && categSeleccionado.nombre} />
            <br />
            <label>Estado: </label>
            <br />
            <input type="text" className='form-group' name='estado' onChange={handleChange} value={categSeleccionado && categSeleccionado.estado} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className='btn btn-primary' onClick={() => peticionPut()} >Editar</Button>{"  "}
          <Button className='btn btn-danger' onClick={() => abrirCerrarModalEditar()} >Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Esta seguro de que quiere eliminar la categoria?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => peticionDelete()}>
            Si
          </button>
          <button className='btn btn-secondary' onClick={() => abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>


    </div>
  );
}

export default App;
