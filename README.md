# React Native Bulletproof Redux Provider

Encrypted Redux Provider wrapper for React Native based on [AsyncStorage](https://github.com/react-native-async-storage/async-storage), [react-native-keychain](https://github.com/oblador/react-native-keychain) and [react-native-securerandom](https://github.com/rh389/react-native-securerandom).

Under the hood, it uses `redux-persist` and `redux-persist-transform-encrypt` for persistence and encryption.

## Why ?

By default, the local storage mechanism in React Native (AsyncStorage) is unencrypted. So we're adding a wrapper around it to make it more bulletproof.

A random key is generated at runtime using `react-native-securerandom` on the user's device and permanently stored using the `react-native-keychain` module. That key is used to encrypt our Redux store, so nobody from outside can read that data.

For a more extensive explanation on how this works, check out the [blog post](https://medium.com/swlh/a-bullet-proof-approach-to-storing-sensitive-user-data-in-react-native-ab3f7a2779f9) I wrote about this approach.

## Installation

```bash
$ yarn add react-native-bulletproof-redux-provider
$ yarn add @react-native-async-storage/async-storage react-native-keychain react-native-securerandom

OR

$ npm install react-native-bulletproof-redux-provider
$ npm install @react-native-async-storage/async-storage react-native-keychain react-native-securerandom

$ cd ios && pod install
```

## Usage

```js
import Provider from 'react-native-bulletproof-redux-provider';
```

Now simply pass in your `initialState` and `rootReducer`:

```
<Provider
  initialState={...}
  rootReducer={...}>
    // your app
</Provider>
```

After wrapping your app inside of `Provider` you can use the usual React bindings to access the store from your components.

### Props

| Property                       | Description                                                                         | Default value             |
| ------------------------------ | ----------------------------------------------------------------------------------- | ------------------------- |
| `rootReducer`                  | Redux reducer used in the store configuration                                       | none                      |
| `initialState`                 | Initial Redux reducer state                                                         | none                      |
| `getEncryptionKey` (optional)  | Custom encryption key method, check `types/getEncryptionKeyType` for interface      | `getEncryptionKeyDefault` |
| `configureStore` (optional)    | Custom configureStore method, check `types/configureStore` for interface            | `configureStoreDefault`   |
| `encryptionErrorCb` (optional) | Gets called when encryption fails, can be used to show an error message to the user | none                      |

## Todos

- [ ] Unit and component tests
- [ ] Allow passing in additional middleware array to `configureStore` function
- [ ] Allow passing in additional transforms array to `createPersistenceConfig` function
- [ ] Allow passing in `key` to `createPersistenceConfig` function (defaults to `root`)
- [ ] Allow defining encryptionKey (username) to `getEncryptionKey` function (defaults to `ENCRYPTED_REDUX`)
- [x] Optional callback function when encryption error occurs in `StoreGate`
- [ ] Make compatible with redux-toolkit

## License

MIT
