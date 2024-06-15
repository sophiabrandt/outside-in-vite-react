export interface ITransportLayer<T> {
  get(): Promise<T[]>;
}
