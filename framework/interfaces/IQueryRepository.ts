export default interface IQueryRepository<T> {
  findById(id: string): Promise<T>;
}
