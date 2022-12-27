import { nanoid } from "nanoid";
import { ICommandHandler } from "../../../../framework/interfaces";
import CreateTaskCommand from "../commands/CreateTaskCommand";
import TaskCreatedEvent from "../events/TaskCreatedEvent";

import { Client } from "@notionhq/client";

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

export default class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand, TaskCreatedEvent>
{
  async handle(command: CreateTaskCommand): Promise<TaskCreatedEvent> {
    notionClient.pages.create({
      parent: { type: "database_id", database_id: command.databaseId },
      properties: {
        Name: { title: [{ text: { content: command.title } }] },
        Status: { select: { name: command.status } },
      },
      children: [
        {
          object: "block",
          paragraph: {
            rich_text: [{ text: { content: command.description } }],
            color: "default",
          },
        },
      ],
    });

    const id = nanoid();

    return new TaskCreatedEvent("system", id, {
      id,
      title: command.title,
      description: command.description,
      databaseId: command.databaseId,
      status: command.status,
    });
  }
}
