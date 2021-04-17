/* @flow */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPersistenceConfig = (encryptionTransform: any) => ({
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  transforms: [encryptionTransform],
});
