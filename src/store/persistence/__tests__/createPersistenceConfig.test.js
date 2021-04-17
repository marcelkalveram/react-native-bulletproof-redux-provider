import {createPersistenceConfig} from '../createPersistenceConfig';

const transformMock = {in: jest.fn(), out: jest.fn()};

describe('createPersistenceConfig', () => {
  it('should return a persistence config', () => {
    const res = createPersistenceConfig(transformMock);
    expect(res.key).toBe('root');
    expect(typeof res.storage).toBe('function');
    expect(Array.isArray(res.blacklist)).toBe(true);
    expect(typeof res.transforms[0].in).toBe('function');
    expect(typeof res.transforms[0].out).toBe('function');
  });
});
