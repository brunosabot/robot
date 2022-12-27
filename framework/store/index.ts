import { store as storeConfig } from "../../config";
import inject from "../decorators/inject";
import injectable from "../decorators/injectable";
import { IEvent, IEventStore } from "../interfaces";
import IEventBus from "../interfaces/IEventBus";
import LocalEventStore from "./LocalEventStore";
import MongoEventStore from "./MongoEventStore";

export type StoreType = "mongodb" | "inMemory";
export type Store = MongoEventStore | LocalEventStore;

@injectable("EventStore", true)
export default class EventStore {
  @inject(["EventBus"])
  getInstance(eventBus: IEventBus): IEventStore<IEvent<any>> {
    const store =
      storeConfig.type === "mongodb"
        ? new MongoEventStore()
        : new LocalEventStore();

    eventBus.subscribe("*", (event) => {
      store.publish(event);
    });

    return store;
  }
}
