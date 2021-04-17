/* @flow */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStore = async () => {
  try {
    AsyncStorage.clear();
  } catch (err) {
    // in case the store has been cleared,
    // so we want to gracefully ignore this here without throwing another error
    console.log(err);
  }
};
