
import './App.css';
import Login from './componentes/contador/Login/Login';
import Paquetes from './componentes/contador/Paquetes/Paquetes';
import Registro from './componentes/contador/Register/Register';
import { Container, Col, Row } from 'react-bootstrap';
import Panel from './componentes/contador/Panel/Panel';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <div className="App">
    
    <Container style={{ marginTop: '50px' }}>
    <BrowserRouter  style={{ marginTop: '50px' }} >
    <Redirect from="/" to="login" />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Registro} />
        {/*Private routes*/}

        <div>
          <Route path="/paquetes" component={Paquetes} />
         
          <Route path="/panel" component={Panel} />
          
        </div>
    </BrowserRouter>
    </Container>
  </div>
);

export default App;
