import { viteEnvVar } from '@/utils/vite-env-var';

describe('viteEnvVar', () => {
  const originalEnv = { ...import.meta.env };

  beforeEach(() => {
    const mockEnv = { ...originalEnv };
    Object.defineProperty(import.meta, 'env', {
      value: mockEnv,
      writable: true,
      configurable: true,
    });
    // Clear cache before each test
    viteEnvVar.cache.clear();
  });

  afterEach(() => {
    Object.defineProperty(import.meta, 'env', {
      value: originalEnv,
      writable: false,
      configurable: true,
    });
  });

  it('returns the value of an environment variable', () => {
    const expected = 'test';
    import.meta.env.NODE_ENV = expected;

    const actual = viteEnvVar.get('NODE_ENV');

    expect(actual).toBe(expected);
  });

  it('caches the value of an environment variable', () => {
    // Arrange
    const expected = 'test';
    import.meta.env.NODE_ENV = expected;
    const getFromCacheSpy = vi.spyOn(viteEnvVar.cache, 'get');
    const setToCacheSpy = vi.spyOn(viteEnvVar.cache, 'set');

    // Act
    viteEnvVar.get('NODE_ENV');
    viteEnvVar.get('NODE_ENV');

    // Assert
    expect(getFromCacheSpy).toHaveBeenCalledWith('NODE_ENV');
    expect(setToCacheSpy).toHaveBeenCalledWith('NODE_ENV', expected);
    expect(getFromCacheSpy).toHaveBeenCalledTimes(1);
    expect(setToCacheSpy).toHaveBeenCalledTimes(1);
    expect(viteEnvVar.cache.size).toBe(1);
    expect(viteEnvVar.get('NODE_ENV')).toBe(expected);
  });

  it('throws an error if value cannot be found', () => {
    expect(() => viteEnvVar.get('NON_EXISTENT_VAR')).toThrow(
      'Environment variable NON_EXISTENT_VAR not found'
    );
  });
});
