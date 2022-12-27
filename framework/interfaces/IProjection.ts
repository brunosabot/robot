import IState from "./IState";

export default interface IProjection<Event, State extends IState> {
  project(event: Event): Promise<State>;
}
