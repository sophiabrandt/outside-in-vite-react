import { createResource } from '@/utils/create-resource';

describe('createResource', () => {
  it('initially is in pending state and throws a suspender', () => {
    const resource = createResource<string>();
    expect(resource.read).toThrow();
  });

  it('updates with success and reads the result', async () => {
    const resource = createResource<string>();
    const promise = Promise.resolve('Test Data');
    resource.update(promise);

    await promise.catch(() => {});

    expect(resource.read()).toBe('Test Data');
    expect(() => resource.read()).not.toThrow();
  });

  it('updates with error and throws when read', async () => {
    const resource = createResource<string>();
    const error = new Error('Failed to fetch');
    const promise = Promise.reject(error);

    // Update resource with the rejected promise and handle the rejection
    resource.update(promise).catch(e => {
      expect(e).toBe(error);
    });

    try {
      await promise;
    } catch (e) {
      // This is expected to fail
    }

    expect(() => resource.read()).toThrow(error);
  });

  it('refreshes the data and reads the new value', () => {
    const resource = createResource<string>();
    resource.refresh('New Data');

    expect(resource.read()).toBe('New Data');
  });
});
