import IEvent from "./IEvent";

type Subscription = (payload: IEvent<any>) => void;

export default interface IEventBus {
  subscribe(event: string | string[], callback: Subscription): () => void;
  publish(event: IEvent<any>): void;
}
