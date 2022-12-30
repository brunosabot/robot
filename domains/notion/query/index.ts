import { FastifyPluginCallback } from "fastify";
import { routify } from "../../../framework/routes";
import ListTasks from "./appplication/listTasks";
import CountTasks from "./appplication/countTasks";
import CountUrgentTasks from "./appplication/countUrgentTasks";
import CountTasksToPlan from "./appplication/countTasksToPlan";

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/listTasks/:id", routify(ListTasks));
  fastify.get("/countTasks/:id", routify(CountTasks));
  fastify.get("/countTasksToPlan/:id", routify(CountTasksToPlan));
  fastify.get("/countUrgentTasks/:id", routify(CountUrgentTasks));

  done();
};

export default routes;
