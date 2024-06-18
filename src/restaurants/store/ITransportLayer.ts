export interface ITransportLayer<T> {
  get(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
}
