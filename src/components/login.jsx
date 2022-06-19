import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7073/api/usuarios";
  const cookies = new Cookies();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const iniciarSesion = async () => {
    await axios.get(baseUrl + '/' + form.username + '/' + form.password)
      .then(response => {
        return response.data;
      }).then(response => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set('id', respuesta.id, { path: '/' });
          cookies.set('nombre', respuesta.nombre, { path: '/' });
          cookies.set('apellido', respuesta.apellido, { path: '/' });
          cookies.set('username', respuesta.username, { path: '/' });
          cookies.set('password', respuesta.password, { path: '/' });
          navigate("/menulogin");
          alert("Bienvenido: " + respuesta.nombre + " " + respuesta.apellido);
        } else {
          alert('El usuario o la contraseña no son correctos');
        }
      })

      .catch(error => {
        console.log(error);
      })
  }
  /*useEffect(()=>{
     if(cookies.get('id')){
       props.history.push('/menulogin');
     }
       },[]);*/

  return (

    <body>


      <div className="form-register">
        <h3 className='text-center'>BIENVENIDO</h3>
        <div className="form-group">
          <label>Usuario: </label>
          <br />
          <input
            type="text"
            className="controls"
            name="username"
            onChange={handleChange}
          />
          <br />
          <label>Contraseña: </label>
          <br />
          <input
            type="password"
            className="controls"
            name="password"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary controls " onClick={() => iniciarSesion()}>Iniciar Sesión</button>
        </div>

      </div>
    </body>

  );
}

export default Login;