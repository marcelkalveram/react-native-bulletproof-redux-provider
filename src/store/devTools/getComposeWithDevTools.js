/* @flow */
import {compose} from 'redux';

export const getComposeWithDevTools = () =>
  __DEV__ &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
