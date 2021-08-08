import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getWithAccessToken } from '../../../midleware/api';
import { useSelector } from 'react-redux';
import { setPaquetes } from '../../../redux/actions/paquetesAction';
import Image from 'react-image-resizer';
import VentaPaquetes from './VentaPaquetes';

const Paquetes = () => {


    const [mensaje, setMensaje] = useState('');

    const dispatch = useDispatch();

    
    useEffect(() => {
        obtenerPaquetes();
    },[])
    const obtenerPaquetes = async () => {
        setMensaje("Obteniendo paquetes...")
        await getWithAccessToken('/paquetes.php')
            .then(res => { return res.json() })
            .then(res => {
                if (res.codigo === 200) {
                    if (res.destinos)
                        dispatch(setPaquetes(res))
                    else
                        setMensaje("No se encontraron paquetes")
                } else {
                    setMensaje("Error obtenendo paquetes")
                }
            }).catch(err => console.error(err));


    }

    const paquetes = useSelector((state) => state.paquetesReducer.paquetes);
    return (
        <main>

            <div className="paquetes">
                <h1>Destinos disponibles:</h1>
                {paquetes && <VentaPaquetes paquetes={paquetes} />}

                
                {paquetes ? Object.keys(paquetes).map((key, indice) => (
                    <div key={indice}>
                        <div>{`Nombre: USD ${paquetes[key].nombre}`}</div>
                        <div>{`Precio mayor: USD ${paquetes[key].precio_mayor}`}</div>
                        <div>{`Precio menor: USD ${paquetes[key].precio_menor}`}</div>
                        <div><Image
                            img
                            src={`https://destinos.develotion.com/imgs/${paquetes[key].foto}`}
                            alt="Destino"
                            class="center"
                            height={200}
                            width={200}
                        /></div>
                    </div>
                )) : <div>{mensaje}</div>}
            </div>


        </main>
    );
};

export default Paquetes;


/*
{
    "codigo": 200,
    "destinos": [
        {
            "id": 1,
            "nombre": "COSTA MUJERES ALL INCLUSIVE - VERANO",
            "foto": "foto1.jpg",
            "precio_mayor": 1840,
            "precio_menor": 1250
        },
        {
            "id": 2,
            "nombre": "MADRID",
            "foto": "foto2.jpg",
            "precio_mayor": 1450,
            "precio_menor": 1000
        },
        {
            "id": 3,
            "nombre": "PALMA DE MALLORCA ALL INCLUSIVE",
            "foto": "foto3.jpg",
            "precio_mayor": 2400,
            "precio_menor": 1700
        },
        {
            "id": 4,
            "nombre": "San Andrés All Inclusive",
            "foto": "foto4.jpg",
            "precio_mayor": 2000,
            "precio_menor": 1800
        }
    ]
}
  */