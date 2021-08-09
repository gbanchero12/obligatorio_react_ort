import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducer2 from './redux/reducers/reducer2';
import contadorReducer from './redux/reducers/contadorReducer';
import loginReducer from './redux/reducers/loginReducer';
import paquetesReducer from './redux/reducers/paquetesReducer';
import ventasReducer from './redux/reducers/ventasReducer';
import App from './App';
import "typeface-roboto";
import './index.css';

const rootReducer = combineReducers({
  contadorReducer: contadorReducer,
  reducer2: reducer2,
  loginReducer: loginReducer,
  paquetesReducer: paquetesReducer,
  ventasReducer: ventasReducer,
});

// debemos crear la store, y pasarla luego al <Provider> (ver línea: 20)
const store = createStore(
  rootReducer,
  // este parámtro es necesario solo para poder utilizar las Redux DevTools y poder debuggear mejor
  // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// envolvemos nuestra <App /> en el `provider` con la `store`
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
