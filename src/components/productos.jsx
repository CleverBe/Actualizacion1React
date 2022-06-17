import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../App.css';

function App() {

    const baseUrl = "https://localhost:7073/api/producto";
    const baseUrl2 = "https://localhost:7073/api/categoria";
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [ProductoSeleccionado, setProductoSeleccionado] = useState({
        id: '',
        nombre: '',
        costo: '',
        precio: '',
        caracteristicas: '',
        stock: '',
        marca: '',
        categoria_id: '',
    })


    const handleChange = e => {
        const { name, value } = e.target;
        setProductoSeleccionado({
            ...ProductoSeleccionado,
            [name]: value
        });
        console.log(ProductoSeleccionado);
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
    const peticionGet2 = async () => {
        await axios.get(baseUrl2)
            .then(response => {
                setData2(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
        delete ProductoSeleccionado.id;
        ProductoSeleccionado.costo = parseInt(ProductoSeleccionado.costo);
        ProductoSeleccionado.precio = parseFloat(ProductoSeleccionado.precio);
        ProductoSeleccionado.stock = parseFloat(ProductoSeleccionado.stock);
        await axios.post(baseUrl, ProductoSeleccionado)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        ProductoSeleccionado.costo = parseInt(ProductoSeleccionado.costo);
        ProductoSeleccionado.precio = parseFloat(ProductoSeleccionado.precio);
        ProductoSeleccionado.stock = parseFloat(ProductoSeleccionado.stock);
        await axios.put(baseUrl + "/" + ProductoSeleccionado.id, ProductoSeleccionado)
            .then(response => {
                var respuesta = response.data;
                var dataAuxiliar = data;
                dataAuxiliar.map(producto => {
                    if (producto.id === ProductoSeleccionado.id) {
                        producto.nombre = respuesta.nombre;
                        producto.costo = respuesta.costo;
                        producto.precio = respuesta.precio;
                        producto.caracteristicas = respuesta.caracteristicas;
                        producto.stock = respuesta.stock;
                        producto.marca = respuesta.marca;
                        producto.categoria_id = respuesta.categoria_id;
                    }
                });
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + ProductoSeleccionado.id)
            .then(response => {
                setData(data.filter(producto => producto.id !== response.data));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const SeleccionarProducto = (producto, caso) => {
        setProductoSeleccionado(producto);
        (caso === "Editar") ?
            abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    }

    useEffect(() => {
        peticionGet();
    }, [])
    useEffect(() => {
        peticionGet2();
    }, [])

    return (
        <div className="App">
            <br></br>
            <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success mb-3">Insertar Nuevo producto</button>
            <br></br>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Costo</th>
                        <th>Precio</th>
                        <th>Caracteristicas</th>
                        <th>Stock</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.costo}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.caracteristicas}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.categoria_id}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => SeleccionarProducto(producto, "Editar")}>Editar</button> {"  "}
                                <button className='btn btn-danger' onClick={() => SeleccionarProducto(producto, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar un nuevo producto</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className='form-group' name="nombre" onChange={handleChange} />
                        <br />
                        <label>Costo: </label>
                        <br />
                        <input type="text" className='form-group' name="costo" onChange={handleChange} />
                        <br />
                        <label>Precio: </label>
                        <br />
                        <input type="text" className='form-group' name="precio" onChange={handleChange} />
                        <br />
                        <label>Caracteristicas: </label>
                        <br />
                        <input type="text" className='form-group' name="caracteristicas" onChange={handleChange} />
                        <br />
                        <label>Stock: </label>
                        <br />
                        <input type="text" className='form-group' name="stock" onChange={handleChange} />
                        <br />
                        <label>Marca: </label>
                        <br />
                        <input type="text" className='form-group' name="marca" onChange={handleChange} />
                        <br />
                        <label>Categoria: </label>
                        <br />
                        <div className='form-group'>
                            <select className='form-group' name="categoria_id" onChange={handleChange} >
                                <option disabled>Seleccione una categoria</option>
                                {data2.map(categoria => (
                                    <option key={categoria.id} value={categoria.id} >{categoria.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-primary' onClick={() => peticionPost()} >Insertar</Button>{"  "}
                    <Button className='btn btn-danger' onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar producto</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>ID: </label>
                        <br />
                        <input type="text" className='form-group' readOnly value={ProductoSeleccionado && ProductoSeleccionado.id} />
                        <br />
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className='form-group' name='nombre' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.nombre} />
                        <br />
                        <label>Costo: </label>
                        <br />
                        <input type="text" className='form-group' name='costo' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.costo} />
                        <br />
                        <label>Precio: </label>
                        <br />
                        <input type="text" className='form-group' name='precio' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.precio} />
                        <br />
                        <label>Caracteristicas: </label>
                        <br />
                        <input type="text" className='form-group' name='caracteristicas' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.caracteristicas} />
                        <br />
                        <label>Stock: </label>
                        <br />
                        <input type="text" className='form-group' name='stock' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.stock} />
                        <br />
                        <label>Marca: </label>
                        <br />
                        <input type="text" className='form-group' name='marca' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.marca} />
                        <br />
                        <label>Categoria: </label>
                        <br />
                        <div className='form-group'>
                            <select className='form-group' name='categoria_id' onChange={handleChange} value={ProductoSeleccionado && ProductoSeleccionado.categoria_id} >
                                <option disabled>Seleccione una categoria</option>
                                {data2.map(categoria => (
                                    <option key={categoria.id} value={categoria.id} >{categoria.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-primary' onClick={() => peticionPut()} >Editar</Button>{"  "}
                    <Button className='btn btn-danger' onClick={() => abrirCerrarModalEditar()} >Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Esta seguro de que quiere eliminar el producto?
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