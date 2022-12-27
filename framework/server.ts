import fastifyCompress from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import inject from "./decorators/inject";
import fastify from "./fastify";
import { IServer } from "./interfaces/IServer";

export default class Server {
  @inject(["EventStore"])
  async init(options: IServer) {
    fastify.register(fastifyHelmet, { contentSecurityPolicy: false });
    fastify.register(fastifyCompress, {});
    fastify.register(fastifyCors, {
      origin: true,
    });
    fastify.decorate("framework", options);

    fastify.get("/", async () => ({ hello: "world" }));

    options.routes.forEach((name) => {
      import(`../domains/${name}/command/index`).then((e) => {
        fastify.register(e.default, { prefix: "/api/events" });
      });
      import(`../domains/${name}/query/index`).then((e) => {
        fastify.register(e.default, { prefix: "/api/query" });
      });
    });

    try {
      await fastify.listen(options.fastify.port);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
}
