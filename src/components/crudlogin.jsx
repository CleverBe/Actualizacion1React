import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../App.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function App() {
    const baseUrl = "https://localhost:7073/api/usuarios";
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [usuarioSeleccionado, setUsuariosSeleccionado] = useState({
        id: '',
        nombre: '',
        apellido: '',
        username: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setUsuariosSeleccionado({
            ...usuarioSeleccionado,
            [name]: value
        });
        console.log(usuarioSeleccionado);
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
        delete usuarioSeleccionado.id;
        await axios.post(baseUrl, usuarioSeleccionado)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put(baseUrl + "/" + usuarioSeleccionado.id, usuarioSeleccionado)
            .then(response => {
                var respuesta = response.data;
                var dataAuxiliar = data;
                dataAuxiliar.map(usuarios => {
                    if (usuarios.id === usuarioSeleccionado.id) {
                        usuarios.nombre = respuesta.nombre;
                        usuarios.apellido = respuesta.apellido;
                        usuarios.username = respuesta.username;
                        usuarios.password = respuesta.password;

                    }
                });
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + usuarioSeleccionado.id)
            .then(response => {
                setData(data.filter(usuarios => usuarios.id !== response.data));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const SeleccionarUsuario = (usuario, caso) => {
        setUsuariosSeleccionado(usuario);
        (caso === "Editar") ?
            abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <div className="content-wrapper">
            <div className="row p-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Listado de Categorias</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ width: 250 }}>
                                    <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success p-2">Insertar Nuevo</button>
                                </div>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Usuario</th>
                                        <th>Contrase??a</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(usuario => (
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellido}</td>
                                            <td>{usuario.username}</td>
                                            <td>{usuario.password}</td>

                                            <td>
                                                <button className='btn btn-primary' onClick={() => SeleccionarUsuario(usuario, "Editar")}>Editar</button> {"  "}
                                                <button className='btn btn-danger' onClick={() => SeleccionarUsuario(usuario, "Eliminar")}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Modal isOpen={modalInsertar}>
                                <ModalHeader>Crear | Nuevo usuario</ModalHeader>
                                <ModalBody>
                                    <div className='form-group'>
                                        <label>Nombre: </label>
                                        <br />
                                        <input type="text" className='form-group' name="nombre" onChange={handleChange} />
                                        <br />
                                        <label>Apellido: </label>
                                        <br />
                                        <input type="text" className='form-group' name="apellido" onChange={handleChange} />
                                        <br />
                                        <label>Usuario: </label>
                                        <br />
                                        <input type="text" className='form-group' name="username" onChange={handleChange} />
                                        <br />
                                        <label>Contrase??a: </label>
                                        <br />
                                        <input type="password" className='form-group' name="password" onChange={handleChange} />
                                        <br />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className='btn btn-primary' onClick={() => peticionPost()} >Insertar</Button>{"  "}
                                    <Button className='btn btn-danger' onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={modalEditar}>
                                <ModalHeader>Editar | Usuario</ModalHeader>
                                <ModalBody>
                                    <div className='form-group'>
                                        <label>ID: </label>
                                        <br />
                                        <input type="text" className='form-group' readOnly value={usuarioSeleccionado && usuarioSeleccionado.id} />
                                        <br />
                                        <label>Nombre: </label>
                                        <br />
                                        <input type="text" className='form-group' name='nombre' onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre} />
                                        <br />
                                        <label>Apellido: </label>
                                        <br />
                                        <input type="text" className='form-group' name='apellido' onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellido} />
                                        <br />
                                        <label>Usuario: </label>
                                        <br />
                                        <input type="text" className='form-group' name='username' onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.username} />
                                        <br />
                                        <label>Contrase??a: </label>
                                        <br />
                                        <input type="text" className='form-group' name='password' onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.password} />
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
                                    ??Esta seguro de que quiere eliminar el usuario?
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
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
            </div>
        </div>
    );
}

export default App;