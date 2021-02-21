import {getEncryptionKey} from '../getEncryptionKey';
import {getGenericPassword, setGenericPassword} from 'react-native-keychain';
import {generateSecureRandom} from 'react-native-securerandom';
import binaryToBase64 from 'react-native/Libraries/Utilities/binaryToBase64';

jest.mock('react-native-keychain', () => ({
  getGenericPassword: jest.fn().mockResolvedValue(false),
  setGenericPassword: jest.fn().mockResolvedValue(false),
}));

jest.mock('react-native-securerandom', () => ({
  generateSecureRandom: jest
    .fn()
    .mockResolvedValue({password: 'random-byte-string'}),
}));

jest.mock('react-native/Libraries/Utilities/binaryToBase64', () =>
  jest.fn().mockReturnValue('random-byte-string-converted'),
);

describe('getEncryptionKey', () => {
  it('should throw an error if randomBytes generation fails', async () => {
    generateSecureRandom.mockResolvedValueOnce(false);
    await expect(getEncryptionKey()).rejects.toThrow(
      'Error: Error generating a secure random key buffer',
    );
  });

  it('should throw an error if binary to base conversion fails', async () => {
    binaryToBase64.mockReturnValueOnce(false);
    await expect(getEncryptionKey()).rejects.toThrow(
      'Error converting secure random key buffer',
    );
  });

  it('should throw an error if setting the credentials fails', async () => {
    await expect(getEncryptionKey()).rejects.toThrow(
      'Error setting the generic password on Keychain',
    );
  });

  it('should return a fresh valid key if a password has NOT been generated before', async () => {
    setGenericPassword.mockResolvedValue(true);
    const res = await getEncryptionKey();
    expect(res.isFresh).toBe(true);
    expect(res.key).toBe('random-byte-string-converted');
  });

  it('should return a non-fresh valid key if a password has been generated before', async () => {
    getGenericPassword.mockResolvedValueOnce({password: 'genericPassword'});
    setGenericPassword.mockResolvedValueOnce(true);
    const res = await getEncryptionKey();
    expect(res.isFresh).toBe(false);
    expect(res.key).toHaveLength(15);
  });
});
