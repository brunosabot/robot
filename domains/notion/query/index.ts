import { FastifyPluginCallback } from "fastify";
import { routify } from "../../../framework/routes";
import ListTasks from "./appplication/listTasks";
import CountTasks from "./appplication/countTasks";

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/listTasks/:id", routify(ListTasks));
  fastify.get("/countTasks/:id", routify(CountTasks));

  done();
};

export default routes;
