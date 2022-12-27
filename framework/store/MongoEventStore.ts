import { IEvent, IEventStore } from "../interfaces";
import { mapDomainToMongoose } from "./EventMapper";
import EventModel from "./EventMongoModel";

type AllEvents = any;

class MongoEventStore implements IEventStore<AllEvents> {
  async publish(event: IEvent<AllEvents>): Promise<boolean> {
    const mongoEvent = mapDomainToMongoose(event);
    mongoEvent.save();

    return true;
  }

  async getEvents(
    id: string,
    key: string = "aggregateId"
  ): Promise<IEvent<AllEvents>[]> {
    const events = await EventModel.find({ [key]: id });

    return events;
  }
}

export default MongoEventStore;
