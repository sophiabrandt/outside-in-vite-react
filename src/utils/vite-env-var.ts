export const viteEnvVar = Object.freeze({
  cache: new Map<string, string>(),

  get(name: string) {
    if (this.cache.has(name)) {
      return this.cache.get(name);
    }
    const value = import.meta.env[name];
    this.assertNoUndefined(value, name);

    this.cache.set(name, value);

    return value;
  },

  assertNoUndefined(value: string, name: string) {
    if (value === undefined) {
      throw new Error(`Environment variable ${name} not found`);
    }
  },
});
