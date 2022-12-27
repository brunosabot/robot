import { __injectables } from "./injectable";

export default function inject(names: string[]) {
  return (target: any, methodName: string, descriptor: any) => {
    const original = descriptor.value;

    // The very goal is to override the method
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function injectionMethod(...args: any[]) {
      const injections = names.map((name) => __injectables.get(name));

      return original.apply(this, [...args, ...injections]);
    };

    return descriptor;
  };
}
