import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../../midleware/api';
import { useSelector } from 'react-redux';
import { loginAction } from '../../../redux/actions/loginActions';
import { updateVentas } from '../../../redux/actions/ventasActions';


const Login = () => {
  


  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  
 

  const login = async () => {
    const usuario = usuarioRef.current.value;
    const password = passwordRef.current.value;

    if (usuario.length === 0) {
      setError('Usuario no puede ser vacío');
      return;
    }

    if (password.length === 0) {
      setError('Password no puede ser vacío');
      return;
    }   
    await post('/login.php', { usuario, password })
    .then(res => { if(res) return res.json() })
    .then(res => {
        if (res) {
          if(res.codigo === 200){
            localStorage.setItem("token",res.apiKey);
            dispatch(loginAction({ usuario ,id: res.id, token: res.apiKey }))
            dispatch(updateVentas({updateVentas:true}))
            setError("")
          }else if(res.codigo === 409){
            setError(res.mensaje)
          } else {
            setError("Error inesperado")
          }
        }

    }).catch(err =>
        console.error(err)
    );
  }

  
  let usuario = useSelector((state) => state.loginReducer.usuario);
  let id = useSelector((state) => state.loginReducer.id);
  return (
    <main>
      <h1>Login</h1>
      <input type="text" name="usuario" ref={usuarioRef} />
      <input type="password" name="password" ref={passwordRef} />
      <button onClick={() => login()}> Login </button>

      {error && <div className="error"> {error} </div>}

      <h2>Usuario actual: {usuario}</h2>
      <h2>ID Vendedor: {id}</h2>
    </main>
  );
};

export default Login;

