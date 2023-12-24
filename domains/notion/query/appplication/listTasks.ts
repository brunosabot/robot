import { FastifyRequest } from "fastify";
import privateRoute from "../../../../framework/decorators/privateRoute";
import NotionEisenhowerResponse from "../models/NotionEisenhowerResponse";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface IListTasksDTO {
  id: string;
}

interface ITask {
  priority: number;
  status: string;
  name: string;
}

export default class ListTasksRoute {
  @privateRoute()
  async route(
    req: FastifyRequest<{ Params: IListTasksDTO }>,
    res: any
  ): Promise<ITask[]> {
    const response = await notion.databases.query({
      database_id: req.params.id,
      filter: {
        or: [
          { property: "Eisenhower", select: { equals: "Qualify" } },
          { property: "Eisenhower", select: { equals: "Important/Urgent" } },
          {
            property: "Eisenhower",
            select: { equals: "Not important/Urgent" },
          },
          {
            property: "Eisenhower",
            select: { equals: "Important/Not urgent" },
          },
          {
            property: "Eisenhower",
            select: { equals: "Not important/Not urgent" },
          },
        ],
      },
      sorts: [{ property: "Eisenhower", direction: "ascending" }],
    });

    return (response as unknown as NotionEisenhowerResponse).results
      .map((result: any) => {
        const { Eisenhower, Name } = result.properties;

        const priorities = {
          Qualify: 0,
          "Important/Urgent": 1,
          "Not important/Urgent": 2,
          "Important/Not urgent": 3,
          "Not important/Not urgent": 4,
        };

        const name = Eisenhower.select.name as keyof typeof priorities;

        const task: ITask = {
          priority: priorities[name],
          status: name,
          name: Name.title[0].plain_text,
        };

        return task;
      })
      .sort((a: ITask, b: ITask) => (b.priority - a.priority > 0 ? -1 : 1));
  }
}
