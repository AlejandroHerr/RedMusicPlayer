/* global __DEV__ */
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import Root from './Root';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import io from 'socket.io-client';

if (__DEV__) {
  installDevTools(Immutable);
}

const socket = io.connect('http://localhost:8080');
const store = createStore(socket);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
