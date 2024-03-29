import { FastifyRequest } from "fastify";
import privateRoute from "../../../../framework/decorators/privateRoute";
import NotionEisenhowerResponse from "../models/NotionEisenhowerResponse";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface ICountTasksToPlanDTO {
  id: string;
}

export interface ITaskCount {
  count: number;
}

export default class CountTasksToPlanRoute {
  @privateRoute()
  async route(
    req: FastifyRequest<{ Params: ICountTasksToPlanDTO }>,
    res: any
  ): Promise<ITaskCount> {
    const response = await notion.databases.query({
      database_id: req.params.id,
      filter: {
        and: [
          {
            or: [
              {
                property: "Status",
                status: { equals: "Not started" },
              },
              {
                property: "Status",
                status: { equals: "In progress" },
              },
            ],
          },
          {
            or: [{ property: "Eisenhower", select: { equals: "Qualify" } }],
          },
        ],
      },
      sorts: [{ property: "Eisenhower", direction: "ascending" }],
    });

    return {
      count: (response as unknown as NotionEisenhowerResponse).results.length,
    };
  }
}
