import { model } from "mongoose";
import EventMongoSchema, { IEventMongo } from "./EventMongoSchema";

const EventModel = model<IEventMongo>("Event", EventMongoSchema);

export default EventModel;
