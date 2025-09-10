
import { Command } from "./Command.js";

/* Используется для осуществления очередного шага игры при команде из view.
 ***********************************************************************/
export class StepCommand extends Command {
  private step: number;

  public setStepNumber(n: number): StepCommand { 
    this.step = n
    return this;
  }

  public execute(): void {
    this._controller.onStep(this.step);
  }
}