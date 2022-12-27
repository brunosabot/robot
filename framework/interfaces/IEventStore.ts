import IEvent from "./IEvent";

export default interface IEventStore<TPayload> {
  publish(event: IEvent<TPayload>): Promise<boolean>;
  getEvents(aggregateId: string, key?: string): Promise<IEvent<TPayload>[]>;
}
