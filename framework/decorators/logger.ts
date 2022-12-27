export default function logger(
  initialLog?: string,
  finalLog?: string
): (...args: any[]) => void {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const { name } = target.constructor;
    const method = descriptor.value;
    const pinoLogger = console;

    // The very goal is to override the method
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function loggerMethod(...args: any[]) {
      if (initialLog) pinoLogger.info(initialLog);

      const result = method.apply(this, args);

      if (finalLog) pinoLogger.info(finalLog);

      return result;
    };

    return descriptor;
  };
}
