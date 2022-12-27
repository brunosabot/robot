import { IEvent, IEventStore } from "../interfaces";

type AllEvents = any;

function defaultPredicate(id: string, key: string | keyof IEvent<any>) {
  return function (predicate: IEvent<AllEvents>) {
    if (key.startsWith("payload.")) {
      return predicate.payload[key] === id;
    } else {
      const eventKey = key as keyof IEvent<any>;
      return predicate[eventKey] === id;
    }
  };
}

class LocalEventStore implements IEventStore<AllEvents> {
  private store: IEvent<AllEvents>[] = [];

  async publish(event: IEvent<AllEvents>): Promise<boolean> {
    this.store.push(event);

    return true;
  }

  async getEvents(
    aggregateId: string,
    key: string = "aggregateId"
  ): Promise<IEvent<AllEvents>[]> {
    return this.store.filter(defaultPredicate(aggregateId, key));
  }
}

export default LocalEventStore;
