import Fastify from "fastify";
import * as config from "../config";

declare module "fastify" {
  interface FastifyRequest {
    token: {
      id: string;
      iat: number;
    };
    timings: {
      [key: symbol]: [number, number];
    };
  }
  interface FastifyInstance {
    framework: {
      store: {
        type: string;
      };
      database: {
        type: string;
        url: string;
      };
      port: number;
    };
  }
}

const fastify = Fastify({ logger: config.fastify.log });

const NS_PER_SEC = 1e9;
const NS_PER_MS = 1e6;

const symbolRequestTime = Symbol("RequestTimer");

fastify.addHook("onRequest", (request, reply, done) => {
  request.timings = {};
  request.timings[symbolRequestTime] = process.hrtime();

  done();
});

fastify.addHook("onSend", (request, reply, payload, done) => {
  const initialTiming = request.timings[symbolRequestTime];
  const [seconds, nanoseconds] = process.hrtime(initialTiming);

  const nsDuration = seconds * NS_PER_SEC + nanoseconds;
  const msDuration = nsDuration / NS_PER_MS;

  reply.header("X-Response-Time", msDuration.toFixed(2));

  done();
});

export default fastify;
