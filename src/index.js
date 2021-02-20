/* @flow */

import * as React from 'react';

import {EncryptionGate} from './components/EncryptionGate';
import {StoreGate} from './components/StoreGate';
import {getEncryptionKey as getEncryptionKeyDefault} from './store/encryption/getEncryptionKey';
import {configureStore as configureStoreDefault} from './store/configureStore';
import {Provider} from 'react-redux';

import type {GetEncryptionKeyType} from './types/encryptionKey';
import type {ConfigureStoreType, Obj} from './types/configureStore';

type Props = {
  getEncryptionKey?: GetEncryptionKeyType,
  configureStore?: ConfigureStoreType,
  encryptionErrorCb?: () => void,
  rootReducer: Obj,
  initialState: Obj,
  children: React.Node,
};

export default ({
  getEncryptionKey = getEncryptionKeyDefault,
  configureStore = configureStoreDefault,
  encryptionErrorCb = null,
  rootReducer,
  initialState,
  children,
}: Props) => (
  <EncryptionGate getEncryptionKey={getEncryptionKey}>
    {(encryptionKey) => (
      <StoreGate
        rootReducer={rootReducer}
        initialState={initialState}
        configureStore={configureStore}
        encryptionKey={encryptionKey}
        encryptionErrorCb={encryptionErrorCb}>
        {({store, persistor}) => <Provider store={store}>{children}</Provider>}
      </StoreGate>
    )}
  </EncryptionGate>
);
