/* @flow */
import type {EncryptionKeyType} from './encryptionKey';

export type Obj = {[key: string]: any};

export type ConfigureStoreReturnType = {store: any, persistor: any};
export type ConfigureStoreType = ({
  rootReducer: (state: Obj, action: Obj) => Obj,
  initialState: Obj,
  encryptionKey: EncryptionKeyType,
  hasData: boolean,
  middlewares: any[],
}) => ConfigureStoreReturnType;
