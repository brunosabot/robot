export default interface IEvent<Payload> {
  id: string;
  date: Date;
  type: string;
  aggregateType: string;
  aggregateId: string;
  author: string;
  payload: Payload;
}
