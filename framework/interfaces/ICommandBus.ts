import ICommand from "./ICommand";
import ICommandHandler from "./ICommandHandler";
import IEvent from "./IEvent";

type Subscription = (payload: IEvent<any>) => void;

export default interface ICommandBus {
  handle<
    C extends ICommand,
    H extends ICommandHandler<C, E>,
    E extends IEvent<any>
  >(
    command: C
  ): Promise<E>;
}
