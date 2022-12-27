import { nanoid } from "nanoid";
import { IEvent } from "./interfaces";

export default class Event<P> implements IEvent<P> {
  readonly id: string = nanoid();
  readonly date: Date = new Date();

  constructor(
    readonly author: string,
    readonly type: string,
    readonly aggregateType: string,
    readonly aggregateId: string,
    readonly payload: P
  ) {
    if (!author) throw new Error("author is required");
    if (!type) throw new Error("type is required");
    if (!aggregateType) throw new Error("aggregateType is required");
    if (!aggregateId) throw new Error("aggregateId is required");
    if (!payload) throw new Error("payload is required");
  }
}
