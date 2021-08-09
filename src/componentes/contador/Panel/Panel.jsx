import { useEffect } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import "./Panel.css"

const procesarInfo = (ventas, destinos) => {
  return destinos && ventas && destinos.map(destino => {
    let vendidos = ventas.filter(ven => ven.id_paquete === destino.id);
    return {
      nombre: destino.nombre,
      cantidad: ventas.filter(usu => usu.id_paquete === destino.id)
        .map(usu => usu.cantidad_menores + usu.cantidad_mayores)
        .reduce((result, item) => {
          return result + item;
        }, 0),
      precioPromedio: ventas.filter(usu => usu.id_paquete === destino.id)
        .map(usu => ((usu.cantidad_menores * destino.precio_menor) + (usu.cantidad_mayores * destino.precio_mayor))
          / (usu.cantidad_mayores + usu.cantidad_menores)) //QMenores*Pm + QMayores*PM / Tcantidad
        .reduce((result, item) => {
          return result + item;
        }, 0),
      cantidadVendidos: vendidos && vendidos.length


    }
  });
}


const TopDestinos = () => {
  const usuarios = useSelector((state) => state.ventasReducer.ventas);
  const destinos = useSelector((state) => state.paquetesReducer.paquetes);
  const usuarios_destino = procesarInfo(usuarios, destinos);
  const usuariosTop = usuarios_destino && usuarios_destino.filter(ud => ud.cantidadVendidos > 3);

  return (<>
    <h3>Top Destinos</h3>
    {usuariosTop ? usuariosTop
      .map(ut => (
        <Card style={{ margin: '10px', width: '18rem' }}>
          <Card.Body>
            <Card.Title>{ut.nombre}</Card.Title>
            <Card.Text>{ut.cantidadVendidos}</Card.Text>
          </Card.Body>
        </Card>
      )) : <div>No hay usuarios con más de tres ventas asociadas</div>}
  </>);
}


const DestinosAPromocionar = () => {
  const usuarios = useSelector((state) => state.ventasReducer.ventas);
  const destinos = useSelector((state) => state.paquetesReducer.paquetes);
  const usuarios_destino = procesarInfo(usuarios, destinos);
  const usuarios_menos_vendidos = usuarios_destino && usuarios_destino.filter(ud => ud.cantidadVendidos === 0);

  return (<>
    <div >
      <h3>Destinos a promocionar</h3>
      {usuarios_menos_vendidos ? usuarios_menos_vendidos
        .map(ut => (
          <Card style={{ margin: '10px', width: '18rem' }}>
            <Card.Body>
              <Card.Title>{ut.nombre}</Card.Title>
              <Card.Text>Sin ventas</Card.Text>
            </Card.Body>
          </Card>
        )) : <div>No hay usuarios sin ventas asociadas</div>}
    </div>
  </>);
}

const ListaDestinos = () => {
  const usuarios = useSelector((state) => state.ventasReducer.ventas);
  const destinos = useSelector((state) => state.paquetesReducer.paquetes);
  const usuarios_destino = procesarInfo(usuarios, destinos);
  return (
    <div >
      <h3> Todos los destinos </h3>
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
      <h3> Precio promedio por destino </h3>
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
    <div >
      <h3> Personas por destino </h3>
      <Bar data={data} />
    </div>
  );
};

const Panel = () => {
  const history = useHistory();
  //TODO: controlar si vienen por url que cargue todo
  return (
    <>
      <Container fluid>
        
        
        <h1>Panel</h1>
        <Row>
          <Col>
            <ListaDestinos />
          </Col>
          <Col>
            <PersonasPorDestino />
          </Col>
        </Row>
        <Row>
          <Col>
            <PrecioPorDestino />
          </Col>
          <Col>
            <TopDestinos />
          </Col>
          <Col>
            <DestinosAPromocionar />
          </Col>
        </Row>
        <button onClick={() => { history.goBack() }}>Atras</button>
      </Container>
    </>
  );
};

export default Panel;
