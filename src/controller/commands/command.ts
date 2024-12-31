
import { Controller } from "../controller.js";

export abstract class Command {
  constructor (protected _controller: Controller) { };

  abstract execute(): void;
}
