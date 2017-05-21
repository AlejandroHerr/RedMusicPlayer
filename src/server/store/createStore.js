/* global __DEV__ */
import { applyMiddleware, compose, createStore } from 'redux';
import createNodeLogger from 'redux-node-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createMPDMiddleware } from '../../mpdMiddleware';

export default (mpdClient, initialState) => {
  const enhancers = [];
  const mpdMiddleware = createMPDMiddleware(mpdClient);
  const middlewares = [mpdMiddleware, thunk];
  /*if (__DEV__) {
    const logger = createNodeLogger({ rightArrow: '->' });
    middlewares.push(logger);
  }*/

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  return store;
};
