import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getWithAccessToken } from '../../../../midleware/api';
import { useSelector } from 'react-redux';
import { setVentas } from '../../../../redux/actions/ventasActions';

export const ContadorVentas = () => {
    const [mensaje, setMensaje] = useState('');

    const ventas = useSelector((state) => state.ventasReducer.ventas);
    return (
        <main>

            <div className="ventas">
                <spam><strong>Cantidad de ventas:</strong></spam>{" "}
                <spam>El vendedor tiene: {ventas ? `${ventas.length}`: '0'} ventas</spam>
            </div>


        </main>
    );
};




/*

    {
    "ventas": [
        {
            "id": 3,
            "vendedor_id": 4,
            "nombre_cliente": "Rigoberta Menchú",
            "id_paquete": 1,
            "cantidad_mayores": 5,
            "cantidad_menores": 1
        },
        {
            "id": 4,
            "vendedor_id": 4,
            "nombre_cliente": "cliente 1",
            "id_paquete": 1,
            "cantidad_mayores": 5,
            "cantidad_menores": 1
...
  */