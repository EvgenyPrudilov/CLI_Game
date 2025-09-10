
import { Command } from "./Command.js";

/* Используется для осуществления выхода из игры при команде quit из view.
 ***********************************************************************/
export class QuitCommand extends Command {
  public execute(): void {
    this._controller.onQuit();
  }
}