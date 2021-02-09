/* @flow */
import type {ConfigureStoreType} from '../types/configureStore';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {createEncryptionTransform} from './encryption/createEncryptionTransform';
import {createPersistenceConfig} from './persistence/createPersistenceConfig';
import {getComposeWithDevTools} from './devTools/getComposeWithDevTools';

export const configureStore: ConfigureStoreType = ({
  rootReducer,
  initialState,
  encryptionKey,
  hasData,
  middlewares = [],
}) => {
  const encryptionTransform = createEncryptionTransform(encryptionKey.key);
  const config = createPersistenceConfig(encryptionTransform);
  const persistedReducer = persistReducer(config, rootReducer);

  const composeFn = getComposeWithDevTools();
  const store = createStore(
    persistedReducer,
    initialState,
    composeFn(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
