/* @flow */
import * as Keychain from 'react-native-keychain';
import {generateSecureRandom} from 'react-native-securerandom';
import binaryToBase64 from 'react-native/Libraries/Utilities/binaryToBase64';

import type {GetEncryptionKeyType} from '../../types/encryptionKey';

// A static string that serves as the username in setGenericPassword
const encryptionKey = 'ENCRYPTED_REDUX';

export const getEncryptionKey: GetEncryptionKeyType = async () => {
  try {
    const existingCredentials = await Keychain.getGenericPassword();
    if (existingCredentials) {
      return {isFresh: false, key: existingCredentials.password};
    }

    const randomBytes = await generateSecureRandom(32);
    if (!randomBytes) {
      throw new Error('Error generating a secure random key buffer');
    }
    const randomBytesString = binaryToBase64(randomBytes);
    if (!randomBytesString) {
      throw new Error('Error converting secure random key buffer');
    }

    const hasSetCredentials = await Keychain.setGenericPassword(
      encryptionKey,
      randomBytesString,
    );
    if (hasSetCredentials) {
      return {isFresh: true, key: randomBytesString};
    }
    throw new Error('Error setting the generic password on Keychain');
  } catch (error) {
    throw new Error('Error retrieving generic password from Keychain');
  }
};
