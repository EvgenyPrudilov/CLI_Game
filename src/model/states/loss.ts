import { State } from "./state.js";

export class LossState extends State {
  public handle(): void {
    const currentStep = this._model.getScript().currentStep;

    this.stopGame();
    this.updateView(
      `${ currentStep.currentText }\n\n` +
      `Sorry: You've lost!`
    );
  }
}