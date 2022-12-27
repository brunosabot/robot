import { nanoid } from "nanoid";
import injectable from "./decorators/injectable";
import fastify from "./fastify";
import IEvent from "./interfaces/IEvent";
import IEventBus from "./interfaces/IEventBus";

const logger = fastify.log;

type Subscription = (payload: IEvent<any>) => void;

type SubscriptionList = Map<string, Subscription>;

type EventList = Map<string, SubscriptionList>;

const subscriptions: EventList = new Map();

@injectable("EventBus")
export default class EventBus implements IEventBus {
  private _subscribe(event: string, callback: Subscription) {
    const id = nanoid();

    if (subscriptions.has(event) === false) {
      subscriptions.set(event, new Map());
    }

    subscriptions.get(event)?.set(id, callback);
    logger.info(`New event bus subscription to ${event} with id ${id}`);

    return () => {
      subscriptions.get(event)?.delete(id);
      logger.info(`Remove event bus subscription to ${event} with id ${id}`);
      if (subscriptions.get(event)?.size === 0) {
        logger.info(`Removing event ${event} from subscriptions`);
        subscriptions.delete(event);
      }
    };
  }

  subscribe(event: string | string[], callback: Subscription) {
    if (event instanceof Array) {
      const unsubcribeMethods = event.map((e) => this._subscribe(e, callback));

      return () => {
        unsubcribeMethods.forEach((unsubscribe) => unsubscribe());
      };
    }

    return this._subscribe(event, callback);
  }

  publish(event: IEvent<any>) {
    const eventType = event.type;

    if (
      subscriptions.has(eventType) === false &&
      subscriptions.has("*") === false
    ) {
      return;
    }

    logger.info(`New event ${eventType} published`);

    // Global listener
    subscriptions.get("*")?.forEach((subscription) => subscription(event));

    // Event specific listener
    subscriptions
      .get(eventType)
      ?.forEach((subscription) => subscription(event));
  }
}
