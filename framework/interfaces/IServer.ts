import { StoreType } from "../store";

export interface IServerStore {
  type: StoreType;
}

export interface IServerDatabase {
  type: "mongodb";
  url: string;
}

export interface IServerFastify {
  port: number;
  log: boolean;
}

export interface IServer {
  store: IServerStore;
  database: IServerDatabase;
  routes: string[];
  fastify: IServerFastify;
}
