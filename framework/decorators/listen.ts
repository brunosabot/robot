import "reflect-metadata";

export default function listen(
  events: string | string[]
): (...args: any[]) => void {
  return (target: any, methodName: string) => {
    const listeners =
      Reflect.getMetadata("framework-event-sourcing:listen", target) || [];
    if (events instanceof Array) {
      events.forEach((event) => {
        listeners.push([event, methodName]);
      });
    } else {
      listeners.push([events, methodName]);
    }

    Reflect.defineMetadata(
      "framework-event-sourcing:listen",
      listeners,
      target
    );
  };
}
