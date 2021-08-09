import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getWithAccessToken } from '../../../midleware/api';
import { useSelector } from 'react-redux';
import { setVentas, updateVentas } from '../../../redux/actions/ventasActions';
import { ContadorVentas } from './ContadorVentas/ContadorVentas';


const Ventas = () => {
    const [mensaje, setMensaje] = useState('');

    const dispatch = useDispatch();
    let id = useSelector((state) => state.loginReducer.id);
    const ventas = useSelector((state) => state.ventasReducer.ventas);
    const actualizar = useSelector((state) => state.ventasReducer.updateVentas);
    useEffect(() => {
        if (actualizar)
            obtenerVentas();
    })

    const obtenerVentas = async () => {
        setMensaje("Obteniendo ventas...")
        await getWithAccessToken(`/ventas.php?idVendedor=${id}`)
            .then(res => { return res.json() })
            .then(res => {
                if (res.codigo === 200) {
                    if (res.ventas.length) { dispatch(setVentas(res)) }
                    else {
                        dispatch(setVentas([]));
                        setMensaje("No se encontraron ventas")
                    }
                } else {
                    setMensaje("Error obtenendo ventas")
                }
            }).catch(err => console.error(err));


    }


    return (
        <div>
            <div class="contador">
                <ContadorVentas />
            </div>

            <div className="ventas">
                <h3>Ventas:</h3>
                {ventas ? Object.keys(ventas).map((key, indice) => (
                    <div key={indice} className="">
                        <div>{`Id ${ventas[key].id} - `}
                        {`Vendedor ${ventas[key].vendedor_id} - `}
                        {`Nombre cliente ${ventas[key].nombre_cliente} - `}
                        {`Cantidad mayores ${ventas[key].cantidad_mayores} - `}
                        {`Cantidad menores ${ventas[key].cantidad_menores} - `}</div>
                        <br></br>
                    </div>
                )) : <div style={{color:"red"}}>{mensaje}</div>}
            </div>


        </div>
    );
};

export default Ventas;



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