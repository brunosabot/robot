import { FastifyReply, FastifyRequest } from "fastify";
import BadRequestError from "../errors/BadRequestError";
import DomainError from "../errors/DomainError";
import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";

export default function routify(RouteClasss: any) {
  const route = new RouteClasss();

  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const result = await route.route(req, res);

      res.send(result);
    } catch (error: any) {
      console.error(error);

      if (error instanceof DomainError) res.status(error.code);
      else if (error instanceof BadRequestError) res.status(400);
      else if (error instanceof ForbiddenError) res.status(403);
      else if (error instanceof NotFoundError) res.status(404);
      else res.status(500);

      res.send({ message: error.message });
    }
  };
}
