
import { State } from "./State.js";

/* Используется для хранения данных о Проигрышном состоянии нашей модели.
 ***********************************************************************/
export class LossState extends State {
  
  /* Метод используется после изменения модели для изменения view.
   ***********************************************************************/
  public handle(): void {
    const currentStep = this._model.getScript().currentStep;

    this.stopGame();
    this.updateView(
      `${ currentStep.currentText }\n\n` +
      `Sorry: You've lost!`
    );
  }
}