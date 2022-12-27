import { FastifyPluginCallback } from "fastify";
import { routify } from "../../../framework/routes";
import createTask from "./application/createTask";

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  // import(`./infrastructure/${fastify.framework.store.type}/CompanyRepository`);

  fastify.post("/createTask", routify(createTask));

  done();
};

export default routes;
