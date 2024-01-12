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
            or: [
              { property: "Eisenhower", select: { equals: "Qualify" } },
              {
                property: "Eisenhower",
                select: { equals: "Important/Urgent" },
              },
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
        ],
      },
      sorts: [{ property: "Eisenhower", direction: "ascending" }],
    });

    return (response as unknown as NotionEisenhowerResponse).results
      .map((result) =>
        result.properties.Eisenhower.select.name.replace(/^[0-9]+\. /, "")
      )
      .reduce((acc: Record<string, number>, value: string) => {
        acc[value] = acc[value] ?? 0;
        acc[value] += 1;

        return acc;
      }, {});
  }
}
