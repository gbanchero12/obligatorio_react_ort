import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../../midleware/api';
import { useSelector } from 'react-redux';
import { loginAction } from '../../../redux/actions/loginActions';
import { loginReducer } from '../../../redux/reducers/loginReducer';

const Registro = () => {

    const usuarioRef = useRef(null);
    const passwordRef = useRef(null);
    const [mensaje, setMensaje] = useState('');

    const dispatch = useDispatch();

    const registro = async () => {
        const usuario = usuarioRef.current.value;
        const password = passwordRef.current.value;

        if (usuario.length < 6) {
            setMensaje('Usuario debe contener al menos 6 dígitos');
            return;
        }

        if (password.length < 6) {
            setMensaje('Password debe contener al menos 6 dígitos');
            return;
        }



        await post('/usuarios.php', { usuario, password })
            .then(res => { if (res) return res.json() })
            .then(res => {
                if (res) {
                    if (res.codigo === 200) {
                        localStorage.setItem("token", res.apiKey);
                        dispatch(loginAction({ usuario ,id: res.id, token: res.apiKey }))
                        setMensaje("Usuario creado exitosamente.")
                    } else if (res.codigo === 409) {
                        setMensaje(res.mensaje)
                    } else {
                        setMensaje("Error inesperado")
                    }
                }

            }).catch(err =>
                console.error(err)
            );
    }

    const id = useSelector((state) => state.loginReducer.id);
    return (
        <main>
            <h1>Registro</h1>
            <input type="text" name="usuario" ref={usuarioRef} />
            <input type="password" name="password" ref={passwordRef} />
            <button onClick={() => registro()}> Registrar </button>
            <div>ID Vendedor:{id}        </div>
            {mensaje && <div className="error"> {mensaje} </div>}


        </main>
    );
};

export default Registro;


/*
  {
  "codigo": 200,
  "apiKey": "c3f2a2537fe9a9e107df7332907c838e",
  "id": 565
}

{
  "codigo": 409,
  "mensaje": "Ya existe un usuario registrado con ese nombre"
}
  */