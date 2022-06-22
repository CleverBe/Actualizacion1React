import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import '../css/Login.css';

function Menu(props) {

    const cookies = new Cookies();

    const cerrarSesion = () => {
        props.history.push('./');
    }

    useEffect(() => {
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    }, []);

    return (
        <div className="content-wrapper">
            <div className="form-register">
                <h3 className='text-center'>BIENVENIDO</h3>
                <br />
                <h5 className="controls">ID: {cookies.get('id')}</h5>
                <h5 className="controls">Nombre: {cookies.get('nombre')}</h5>
                <h5 className="controls">Apellido: {cookies.get('apellido')}</h5>
                <h5 className="controls">Username: {cookies.get('username')}</h5>
                <h5 className="controls">Password: {cookies.get('password')}</h5>
                <br />
                <a className="btn btn-danger controls" href="/">Cerrar Sesión</a>
                <br />
            </div>
        </div>
    );
}

export default Menu;