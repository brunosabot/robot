import "reflect-metadata";

export function module(module: string): (...args: any[]) => void {
  return (target: any) => {
    Reflect.defineMetadata("framework-event-sourcing:module", module, target);
  };
}
