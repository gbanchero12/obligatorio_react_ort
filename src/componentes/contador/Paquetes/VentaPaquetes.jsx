import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import {
    Alert,
    Form,
    Button,
    Container,
    Row,
    Col,
    FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { post, postWithAccessToken } from '../../../midleware/api';
import { useHistory } from 'react-router-dom';
import { updateVentas } from '../../../redux/actions/ventasActions';



const VentaPaquetes = (props) => {
    const history = useHistory();
    let idVendedor = useSelector((state) => state.loginReducer.id);    
    useEffect(() => {
        
    }
    );

    const [mensaje, setMensaje] = useState('');
    const ninosRef = useRef(null);
    const adultosRef = useRef(null);
    const clienteRef = useRef(null);
    const refSelect = useRef(null);
    const dispatch = useDispatch();

    const agregarPaquete = async (idVendedor) => {
        const cantidadMenores = ninosRef.current.value;
        const cantidadMayores = adultosRef.current.value;
        const nombreCliente = clienteRef.current.value;
        const idPaquete = refSelect.current.value;
      


        if (!nombreCliente || nombreCliente === "") {
            setMensaje('Ingrese nombre de cliente');
            return;
        }

        if ((!cantidadMayores && !cantidadMenores) || (cantidadMayores === "" && cantidadMenores === "")) {
            setMensaje('Ingrese cantidad de personas');
            return;
        }

        if(parseInt(cantidadMayores) + parseInt(cantidadMenores) > 10){
            setMensaje('Cantidad personas no puede ser mayor a 10');
            return;
        }



        await postWithAccessToken('/ventas.php', {
            idVendedor,
            nombreCliente,
            idPaquete,
            cantidadMayores,
            cantidadMenores
        })
            .then(res => { if (res) return res.json() })
            .then(res => {
                if (res) {
                    if (res.codigo === 200) {
                        setMensaje(res.mensaje)                        
                        dispatch(updateVentas({updateVentas:true}));
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

    const { paquetes } = props;

    return (<div id="VentaPaquetes">

        <div>
            <Form.Label>Nombre</Form.Label>
            <Form.Control ref={clienteRef} />
        </div>

        <div>
            <FloatingLabel controlId="floatingSelect">
                <Form.Select
                    aria-label="Floating label select example"
                    ref={refSelect}
                >
                    {paquetes && paquetes.map((p) => (
                        <option key={p.id} value={p.id}> {p.nombre} </option>
                    ))}
                </Form.Select>
            </FloatingLabel>

        </div>

        <div>
            <Form.Label>Cantidad Adultos</Form.Label>
            <Form.Control type="number" ref={adultosRef} />
        </div>
        <div>
            <Form.Label>Cantidad Niños</Form.Label>
            <Form.Control type="number" ref={ninosRef} />
        </div>
        <button onClick={() => agregarPaquete(idVendedor)}> Agregar </button>
        <spam class="error">{mensaje}</spam>

    </div>
    )
}

export default VentaPaquetes;