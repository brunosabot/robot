import { FastifyRequest } from "fastify";
import inject from "../../../../framework/decorators/inject";
import privateRoute from "../../../../framework/decorators/privateRoute";
import ICommandBus from "../../../../framework/interfaces/ICommandBus";
import IEventBus from "../../../../framework/interfaces/IEventBus";
import CreateTaskCommand from "../commands/CreateTaskCommand";
import TaskCreatedEvent from "../events/TaskCreatedEvent";
import CreateTaskHandler from "../handlers/CreateTaskHandler";

interface ICreateTaskDTO {
  title: string;
  description: string;
  databaseId: string;
  status: string;
}

export default class CreateTaskRoute {
  @privateRoute()
  @inject(["CommandBus", "EventBus"])
  async route(
    req: FastifyRequest<{ Body: ICreateTaskDTO }>,
    res: any,
    commandBus: ICommandBus,
    eventBus: IEventBus
  ): Promise<{ id: string }> {
    const { title, description, databaseId, status } = req.body;

    const CreateTask = new CreateTaskCommand(
      title,
      description,
      databaseId,
      status
    );

    const CreateTaskEvent = await commandBus.handle<
      CreateTaskCommand,
      CreateTaskHandler,
      TaskCreatedEvent
    >(CreateTask);

    eventBus.publish(CreateTaskEvent);

    return { id: CreateTaskEvent.aggregateId };
  }
}
