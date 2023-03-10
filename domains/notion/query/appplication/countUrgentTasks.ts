import { FastifyRequest } from "fastify";
import privateRoute from "../../../../framework/decorators/privateRoute";
import NotionEisenhowerResponse from "../models/NotionEisenhowerResponse";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface ICountUrgentTasksDTO {
  id: string;
}

export interface ITaskCount {
  count: number;
}

export default class CountUrgentTasksRoute {
  @privateRoute()
  async route(
    req: FastifyRequest<{ Params: ICountUrgentTasksDTO }>,
    res: any
  ): Promise<ITaskCount> {
    const response = await notion.databases.query({
      database_id: req.params.id,
      filter: {
        or: [
          { property: "Status", select: { equals: "1. Important/Urgent" } },
          { property: "Status", select: { equals: "2. Pas important/Urgent" } },
        ],
      },
      sorts: [{ property: "Status", direction: "ascending" }],
    });

    return {
      count: (response as unknown as NotionEisenhowerResponse).results.length,
    };
  }
}
