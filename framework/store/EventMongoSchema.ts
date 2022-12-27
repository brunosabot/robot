import { Document, Schema } from "mongoose";

export interface IEventMongo extends Document {
  id: string;
  date: Date;
  type: string;
  aggregateType: string;
  aggregateId: string;
  author: string;
  payload: any;
}

const EventMongoSchema = new Schema<IEventMongo>({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  aggregateType: { type: String, required: true },
  aggregateId: { type: String, required: true },
  author: { type: String, required: true },
  payload: { type: Object, required: true },
});

export default EventMongoSchema;
