import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getWithAccessToken } from '../../../midleware/api';
import { useSelector } from 'react-redux';
import { setPaquetes } from '../../../redux/actions/paquetesAction';

import VentaPaquetes from './VentaPaquetes';
import { useHistory, withRouter } from 'react-router-dom';
import Ventas from '../Ventas/Ventas';
import { Col, Row, Container } from 'react-bootstrap';
import Destinos from './Destinos';

const Paquetes = () => {


    const [mensaje, setMensaje] = useState('');
    const history = useHistory()
    const dispatch = useDispatch();


    useEffect(() => {
        obtenerPaquetes();
    }, [])
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
    let usuario = useSelector((state) => state.loginReducer.usuario);
    let id = useSelector((state) => state.loginReducer.id);
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Administrador</h1>
                    <h2>Usuario actual: {usuario}</h2>
                    <h2>ID Vendedor: {id}</h2>
                    <button onClick={() => { history.push("panel") }}> Panel  </button>

                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Vender paquete:</h3>
                    {paquetes && <VentaPaquetes paquetes={paquetes} />}
                    <Ventas />
                </Col>
                <Col>
                    {paquetes && <Destinos paquetes={paquetes} mensaje={mensaje} />}
                </Col>
            </Row>
            <button onClick={() => { localStorage.setItem("token", ""); history.push("/login"); }}>Logout</button>
        </Container>
    );
};

export default withRouter(Paquetes);


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