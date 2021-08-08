import { useEffect } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';


const procesarInfo = (usuarios, destinos) => {
  return destinos && usuarios && destinos.map(destino => {
    return {
      nombre: destino.nombre,
      cantidad: usuarios.filter(usu => usu.id_paquete === destino.id)
        .map(usu => usu.cantidad_menores + usu.cantidad_mayores)
        .reduce((result, item) => {
          return result + item;
        }, 0),
      precioPromedio: usuarios.filter(usu => usu.id_paquete === destino.id)
        .map(usu => ((usu.cantidad_menores * destino.precio_menor) + (usu.cantidad_mayores * destino.precio_mayor))
          / (usu.cantidad_mayores + usu.cantidad_menores)) //QMenores*Pm + QMayores*PM / Tcantidad
        .reduce((result, item) => {
          return result + item;
        }, 0)
    }
  });
}

const ListaDestinos = () => {
  const usuarios = useSelector((state) => state.ventasReducer.ventas);
  const destinos = useSelector((state) => state.paquetesReducer.paquetes);
  const usuarios_destino = procesarInfo(usuarios, destinos);
  return (
    <div>
      <h1> Todos los destinos </h1>
      <Container fluid>
        <Row>
          <Col>
            Nombre
          </Col>
          <Col>
            Cantidad de personas
          </Col>
        </Row>
        {usuarios_destino && usuarios_destino.map((ud) => (
          <Row>
            <Col>
              {ud.nombre}
            </Col>
            <Col>
              {ud.cantidad}
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

const PrecioPorDestino = () => {
  const usuarios = useSelector((state) => state.ventasReducer.ventas);
  const destinos = useSelector((state) => state.paquetesReducer.paquetes);
  const usuarios_destino = procesarInfo(usuarios, destinos);

  var innerData = {};
  usuarios_destino && usuarios_destino.forEach(ud => {
    innerData[ud.nombre] = ud.precioPromedio;
  })
  const data = innerData && {
    labels: Object.keys(innerData),
    datasets: [
      {
        label: 'Cantidad de personas por destino',
        data: Object.values(innerData),

        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1> Precio promedio por destino </h1>
      <Bar data={data} />
    </div>
  );
}
const PersonasPorDestino = () => {

  const usuarios = useSelector((state) => state.ventasReducer.ventas);
  const destinos = useSelector((state) => state.paquetesReducer.paquetes);
  const usuarios_destino = procesarInfo(usuarios, destinos);
  var innerData = {};
  usuarios_destino && usuarios_destino.forEach(ud => {
    innerData[ud.nombre] = ud.cantidad;
  })
  const data = innerData && {
    labels: Object.keys(innerData),
    datasets: [
      {
        label: 'Cantidad de personas por destino',
        data: Object.values(innerData),

        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1> Personas por destino </h1>
      <Bar data={data} />
    </div>
  );
};

const Panel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    /*  if (!token.length) {
        history.push('/login');
      }*/

    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    /*const response = await fetch('https://reqres.in/api/users');
    const datos = await response.json();

    dispatch({ type: 'AGREGAR_USUARIOS', payload: datos.data });*/
  };

  return (
    <>
      <Row>
        <Col>
          <ListaDestinos />
        </Col>
        <Col>
          <PersonasPorDestino />
        </Col>
        <Col>
          <PrecioPorDestino />
        </Col>
      </Row>
    </>
  );
};

export default Panel;
