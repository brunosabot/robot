import "reflect-metadata";

export const __injectables = new Map();

export default function injectable(
  name?: string,
  builder: boolean = false
): (...args: any[]) => void {
  return (Target: any) => {
    const instance = builder ? new Target().getInstance() : new Target();

    __injectables.set(name ?? Target.constructor.name, instance);
  };
}
