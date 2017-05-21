/* global __DEV__ */
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import createSocketMiddleware from 'socket-middleware/createSocketMiddleware';

export default (socket, initialState) => {
  const enhancers = [];
  const middlewares = [createSocketMiddleware(socket), thunk];

  if (__DEV__) {
    middlewares.push(createLogger());
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : (f) => f);
  }

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
