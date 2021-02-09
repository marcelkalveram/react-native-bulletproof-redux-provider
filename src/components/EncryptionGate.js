/* @flow */
import * as React from 'react';
import {useEffect, useState} from 'react';
import type {EncryptionKeyType} from '../types/encryptionKey';

type EncryptionGateType = ({
  getEncryptionKey: () => Promise<EncryptionKeyType>,
  children: (EncryptionKeyType) => React.Node,
}) => React.Node;

// Generates an encryption Key based on the keyGen function
// The return value adheres to the EncryptionKeyType type, where isFresh indicates whether the key is new
// Before the key is not generated, this component doesn't return anything (hence it's name "...Gate")
export const EncryptionGate: EncryptionGateType = ({
  getEncryptionKey,
  children,
}) => {
  const [encryptionKey, setEncryptionKey] = useState({
    isFresh: false,
    key: null,
  });

  useEffect(() => {
    (async () => {
      const {isFresh, key} = await getEncryptionKey();
      setEncryptionKey({isFresh, key});
    })();
  }, [getEncryptionKey]);

  if (!encryptionKey.key) {
    return null;
  }
  return children(encryptionKey);
};
