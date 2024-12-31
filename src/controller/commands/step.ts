import { Command } from "./command.js";

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