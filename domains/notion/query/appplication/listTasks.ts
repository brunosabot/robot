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
          { property: "Eisenhower", status: { equals: "Qualify" } },
          { property: "Eisenhower", status: { equals: "Important/Urgent" } },
          {
            property: "Eisenhower",
            status: { equals: "Not important/Urgent" },
          },
          {
            property: "Eisenhower",
            status: { equals: "Important/Not urgent" },
          },
          {
            property: "Eisenhower",
            status: { equals: "Not important/Not urgent" },
          },
        ],
      },
      sorts: [{ property: "Eisenhower", direction: "ascending" }],
    });

    return (response as unknown as NotionEisenhowerResponse).results
      .map((result: any) => {
        const { Eisenhower, Name } = result.properties;

        const task: ITask = {
          priority: +Eisenhower.status.name.replace(/\..*/, ""),
          status: Eisenhower.status.name.replace(/^[0-9]+\. /, ""),
          name: Name.title[0].plain_text,
        };

        return task;
      })
      .sort((a: ITask, b: ITask) => (b.priority - a.priority > 0 ? -1 : 1));
  }
}
