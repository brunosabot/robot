import { IEvent } from "../interfaces";
import EventMongoModel from "./EventMongoModel";

export function mapDomainToMongoose(event: IEvent<any>) {
  const { id, date, type, aggregateType, aggregateId, author, payload } = event;

  return new EventMongoModel({
    aggregateId,
    aggregateType,
    author,
    date,
    id,
    payload,
    type,
  });
}
