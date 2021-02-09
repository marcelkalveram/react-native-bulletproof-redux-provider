/* @flow */
import AsyncStorage from '@react-native-community/async-storage';

export const createPersistenceConfig = (encryptionTransform: any) => ({
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  transforms: [encryptionTransform],
});
