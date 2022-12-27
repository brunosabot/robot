import "reflect-metadata";
import { __injectables } from "./injectable";

export default function listening() {
  return (target: any) => {
    const Original = target;
    const f: any = function listingMethod(...args: any[]) {
      const newObject = new Original(...args);
      const listeners = Reflect.getMetadata(
        "framework-event-sourcing:listen",
        newObject
      );

      if (process.env.NODE_ENV === "test") return newObject;

      listeners.forEach(([event, method]: [string, keyof typeof Original]) => {
        __injectables
          .get("EventBus")
          .subscribe(event, newObject[method].bind(newObject));
      });

      return newObject;
    };

    f.prototype = Original.prototype;

    return f;
  };
}
