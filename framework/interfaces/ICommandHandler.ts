import ICommand from "./ICommand";
import IEvent from "./IEvent";

// TODO: No any
export default interface ICommandHandler<
  Command extends ICommand,
  Event extends IEvent<any>
> {
  // new (...args: any): ICommandHandler<Command, Event>;
  handle: (command: Command, ...injects: any[]) => Promise<Event>;
}
