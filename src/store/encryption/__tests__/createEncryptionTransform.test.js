import {createEncryptionTransform} from '../createEncryptionTransform';

describe('createEncryptionTransform', () => {
  it('should return a transform object', () => {
    const res = createEncryptionTransform('test');
    expect(res.hasOwnProperty('in')).toBe(true);
    expect(res.hasOwnProperty('out')).toBe(true);
  });

  it('should ', () => {
    const res = createEncryptionTransform('test');
    const resIn = res.in('transform-test');
    const resOut = res.out(resIn);
    expect(resOut).toBe('transform-test');
  });
});
