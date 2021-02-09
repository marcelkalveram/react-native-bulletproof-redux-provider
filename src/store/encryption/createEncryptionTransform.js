/* @flow */
import {encryptTransform} from 'redux-persist-transform-encrypt';

export const createEncryptionTransform = (secretKey: string) =>
  encryptTransform({
    secretKey,
    onError: function (error) {
      throw new Error('Error with encryption library');
    },
  });
