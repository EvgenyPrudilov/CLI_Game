import { State } from "./state.js";

export class RunningState extends State {
  public handle(): void {
    const currentStep = this._model.getScript().currentStep;
    
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