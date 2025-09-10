
import { Controller } from "../Controller.js";

/* Используется для выполнения команды из view.
 ***********************************************************************/
export abstract class Command {
  constructor (protected _controller: Controller) { };

  abstract execute(): void;
}
