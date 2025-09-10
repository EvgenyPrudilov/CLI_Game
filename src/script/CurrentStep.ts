import { Option, isOptionStep, Step } from "./Types.js";

/* Этот оъект будет использоваться повсеместно для доступа к
 *   данным текущего шага: тексте, вариантам перехода, номере шага, ...
 ***********************************************************************/
export class CurrentStep {
  constructor (private _currentStep: Step) {  }

  get currentId(): number { return this._currentStep.id; }
  get currentText(): string { return this._currentStep.text; }
  get hasOptions(): boolean { return isOptionStep(this._currentStep); }
  get options(): Option[] { return this._currentStep.options; }
  get nextStepId(): number { return this._currentStep.nextStep; }
}