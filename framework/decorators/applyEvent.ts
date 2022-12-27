export default function applyEvent() {
  return (target: any, methodName: string, descriptor: any) => {
    const original = descriptor.value;

    // The very goal is to override the method
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function injectionMethod(...args: any[]) {
      const event = original.apply(this, args);

      if (event !== undefined) {
        if (event instanceof Promise) {
          this.projection.apply(await event);
        } else {
          this.projection.apply(event);
        }
      }

      return event;
    };

    return descriptor;
  };
}
