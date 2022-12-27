import Event from "../../../../framework/Event";

interface ITaskCreatedEventPayload {
  id: string;
  title: string;
  description: string;
  databaseId: string;
  status: string;
}

export default class TaskCreatedEvent extends Event<ITaskCreatedEventPayload> {
  constructor(author: string, id: string, payload: ITaskCreatedEventPayload) {
    super(author, "TaskCreated", "Notion", id, payload);
  }
}
