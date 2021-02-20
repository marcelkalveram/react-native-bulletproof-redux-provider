/* @flow */

import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useState, useEffect} from 'react';

import type {EncryptionKeyType} from '../types/encryptionKey';
import type {
  ConfigureStoreType,
  ConfigureStoreReturnType,
} from '../types/configureStore';

const storageKey = 'persist:root';

type StoreGateType = ({
  rootReducer: any,
  initialState: any,
  configureStore: ConfigureStoreType,
  encryptionKey: EncryptionKeyType,
  encryptionErrorCb: () => void,
  children: (ConfigureStoreReturnType) => React.Node,
}) => React.Node;

// Generates a store bases on the storeGen function
// The returned store/persistor gets passed on to its children
// It checks whether there is data in the store before rendering its children (hence it's name "...Gate")
export const StoreGate: StoreGateType = ({
  rootReducer,
  initialState,
  configureStore,
  encryptionKey,
  encryptionErrorCb,
  children,
}) => {
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    (async () => {
      setHasData(await AsyncStorage.getItem(storageKey));
    })();
  }, []);

  // hasData hasn't been set, so don't return anything
  // in case store is empty, getItem returns `null`, so we have to check for `false`
  if (hasData === false) {
    return null;
  }

  // if the encryption key is fresh, we need to flush AsyncStorage,
  // because the data in there can't be encrypted without the old key
  if (encryptionKey.isFresh && hasData !== null) {
    AsyncStorage.clear();

    // call additional custom cb
    if (encryptionErrorCb) {
      encryptionErrorCb();
    }
  }

  return children(
    configureStore({
      rootReducer,
      initialState,
      encryptionKey,
      hasData,
      middlewares: [],
    }),
  );
};
