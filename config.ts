import {
  IServerDatabase,
  IServerFastify,
  IServerStore,
} from "./framework/interfaces/IServer";
import { StoreType } from "./framework/store";

export const fastify: IServerFastify = {
  port: +(process.env.PORT ?? 3456),
  log: process.env.NODE_ENV === "test" ? false : true,
};

export const port: number = +(process.env.PORT ?? 3456);

export const database: IServerDatabase = {
  type: (process.env.DATABASE_TYPE ?? "mongodb") as "mongodb",
  url: process.env.DATABASE_URL ?? "mongodb://localhost:27017/pickrr",
};

export const store: IServerStore = {
  type: (process.env.STORE_TYPE ?? "inMemory") as StoreType,
};

export const routes: string[] = ["notion"];
