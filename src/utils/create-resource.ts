import { makeAutoObservable } from 'mobx';

export interface Resource<T> {
  read: () => T;
  update: (promise: Promise<T>) => Promise<T>;
  refresh: (data: T) => void;
}

export function createResource<T>(): Resource<T> {
  const resource = {
    status: 'pending' as 'pending' | 'success' | 'error',
    result: undefined as T | Error | undefined,
    suspender: undefined as Promise<T> | undefined,

    read() {
      switch (this.status) {
        case 'pending':
          throw this.suspender;
        case 'error':
          throw this.result;
        case 'success':
          return this.result as T;
        /* v8 ignore next 2 */
        default:
          return this.status satisfies never;
      }
    },

    update(promise: Promise<T>) {
      this.status = 'pending';
      this.suspender = promise.then(
        (r: T) => {
          this.result = r;
          this.status = 'success';
          return r;
        },
        (e: Error) => {
          this.result = e;
          this.status = 'error';
          throw e;
        }
      );
      return this.suspender;
    },

    refresh(data: T) {
      this.result = data;
      this.status = 'success';
    },
  };

  makeAutoObservable(resource);
  return resource;
}
