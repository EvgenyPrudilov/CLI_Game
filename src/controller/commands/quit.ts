import { Command } from "./command.js";

export class QuitCommand extends Command {
  public execute(): void {
    this._controller.onQuit();
  }
}