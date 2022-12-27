import { FastifyRequest } from "fastify";
import privateRoute from "../../../../framework/decorators/privateRoute";
import NotionEisenhowerResponse from "../models/NotionEisenhowerResponse";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface IListTasksDTO {
  id: string;
}

export default class ListTasksRoute {
  @privateRoute()
  async route(
    req: FastifyRequest<{ Params: IListTasksDTO }>,
    res: any
  ): Promise<Record<string, number>> {
    const response = await notion.databases.query({
      database_id: req.params.id,
      filter: {
        or: [
          { property: "Status", select: { equals: "0. Entrant" } },
          { property: "Status", select: { equals: "1. Important/Urgent" } },
          { property: "Status", select: { equals: "2. Pas important/Urgent" } },
          { property: "Status", select: { equals: "3. Important/Pas urgent" } },
          {
            property: "Status",
            select: { equals: "4. Pas important/Pas urgent" },
          },
        ],
      },
      sorts: [{ property: "Status", direction: "ascending" }],
    });

    return (response as unknown as NotionEisenhowerResponse).results
      .map((result) =>
        result.properties.Status.select.name.replace(/^[0-9]+\. /, "")
      )
      .reduce((acc: Record<string, number>, value: string) => {
        acc[value] = acc[value] ?? 0;
        acc[value] += 1;

        return acc;
      }, {});
  }
}
