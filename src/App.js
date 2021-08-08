
import './App.css';
import Login from './componentes/contador/Login/Login';
import Paquetes from './componentes/contador/Paquetes/Paquetes';
import Registro from './componentes/contador/Register/Register';
import Ventas from './componentes/contador/Ventas/Ventas';
import { Container, Col, Row } from 'react-bootstrap';
import Panel from './componentes/contador/Personas/Personas';

const App = () => (
  <div className="App">
    <Container>
      <Row>
      <Col><Login/></Col>
        <Col><Ventas/></Col>
        <Col><Panel/></Col>
        <Col><Paquetes /></Col>
      </Row>
    </Container>
  </div>
);

export default App;
