export default interface IRepository<T> {
  save(entity: T): Promise<void>;
  // get(id: string): Promise<T>;
  remove(id: string): Promise<void>;
}
