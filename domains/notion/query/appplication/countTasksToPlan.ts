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
        or: [{ property: "Status", select: { equals: "0. Entrant" } }],
      },
      sorts: [{ property: "Status", direction: "ascending" }],
    });

    return {
      count: (response as unknown as NotionEisenhowerResponse).results.length,
    };
  }
}
