import "reflect-metadata";
import injectable from "./decorators/injectable";
import fastify from "./fastify";
import { IEvent } from "./interfaces";
import ICommand from "./interfaces/ICommand";
import ICommandBus from "./interfaces/ICommandBus";
import ICommandHandler from "./interfaces/ICommandHandler";

const logger = fastify.log;

const mapping = new Map<string, ICommandHandler<any, any>>();

export function commandMapping(command: ICommand): (...args: any[]) => void {
  return (target: ICommandHandler<any, any>) => {
    const theCommand = command as ICommand & { name: string };

    mapping.set(theCommand.name, target);
  };
}

export function commandModule(module: string): (...args: any[]) => void {
  return (target: any) => {
    Reflect.defineMetadata("framework-event-sourcing:module", module, target);
  };
}

@injectable("CommandBus")
export default class CommandBus implements ICommandBus {
  async handle<
    C extends ICommand,
    H extends ICommandHandler<C, E>,
    E extends IEvent<any>
  >(command: C): Promise<E> {
    const handlerName = `${command.type}Handler`;
    const module = Reflect.getMetadata(
      "framework-event-sourcing:module",
      command.constructor
    );
    const file = `../domains/${module}/command/handlers/${handlerName}`;

    logger.info(`Loading: ${file}`);
    return import(file).then((e) => {
      const Handler = e.default;
      const handlerInstance: H = new Handler();

      return handlerInstance.handle(command);
    });
  }
}
