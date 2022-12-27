export function isEventType<A>(object: any, type: String): object is A {
  return object.type === type;
}
