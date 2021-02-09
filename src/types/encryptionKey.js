/* @flow */
export type EncryptionKeyType = {
  isFresh: boolean,
  key: string,
};

export type GetEncryptionKeyType = () => Promise<EncryptionKeyType>;
