export default function privateRoute(): (...args: any[]) => void {
  return (target: any, methodName: string, descriptor: any) => {
    const original = descriptor.value;

    // The very goal is to override the method
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function privateMethod(...args: any[]) {
      const [req, res] = args;

      try {
        return original.apply(this, args);
      } catch (err) {
        res.status(401);
        return null;
      }
    };
  };
}
