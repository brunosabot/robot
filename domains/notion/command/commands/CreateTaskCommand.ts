import { module } from "../../../../framework/decorators/module";
import { ICommand } from "../../../../framework/interfaces";

@module("notion")
export default class CreateTaskCommand implements ICommand {
  readonly type = "CreateTask";
  readonly date = new Date();

  constructor(
    readonly title: string,
    readonly description: string,
    readonly databaseId: string,
    readonly status: string
  ) {}
}
