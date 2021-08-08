import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/actions/loginActions';
import './contador.css';

const Counter = () => {
  const dispatch = useDispatch();
  const contador = useSelector((state) => state.contadorReducer.contador);

  return (
    <main>
      <button onClick={() => dispatch(incrementar(1))}> SUMAR UNO </button>
      <h1>{contador}</h1>
    </main>
  );
};

export default Counter;
