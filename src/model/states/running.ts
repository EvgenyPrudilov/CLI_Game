
import { State } from "./State.js";

/* Используется для хранения данных о Запущенном состоянии нашей модели.
 ***********************************************************************/
export class RunningState extends State {

  /* Метод используется после изменения модели для изменения view.
   ***********************************************************************/
  public handle(): void {
    const currentStep = this._model.getScript().currentStep;
    
    /* Мы смотрим, есть ли у нас на текущем шаге какие-либо опции, и если 
     *   да, то вывести их, или просто предложить продолжить игру.
     ***********************************************************************/
    let viewText = 
      `${ currentStep.currentText }\n\n`;
      
    if (currentStep.hasOptions) {
      currentStep.options.forEach(element => {
        viewText += `${ element.nextStep }) ${ element.text }\n`;
      });
    } else {
      viewText += `${ currentStep.nextStepId }) Continue\n`;
    }
    viewText += `(Enter step number or QUIT command to quit)`;

    this.updateView(viewText);
  }  
}