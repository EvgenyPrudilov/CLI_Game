import { State } from "./state.js";

export class VictoryState extends State {
  public handle(): void {
    const currentStep = this._model.getScript().currentStep;

    this.stopGame();
    this.updateView(
      `${ currentStep.currentText }\n\n` +
      `Congrats! You won!`
    );
  }
}