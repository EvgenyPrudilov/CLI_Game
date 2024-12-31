
import { FullScript, Step, Option, isOptionStep, isAnyStep } from "./types.js";

import { readFileSync } from "fs";

const STEPS_MINIMUM_NUMBER: number = 2;

export class CurrentStep {

  constructor (private _currentStep: Step) {

  }

  get currentId(): number {
    return this._currentStep.id;
  }

  get currentText(): string {
    return this._currentStep.text;
  }

  get hasOptions(): boolean {
    return isOptionStep(this._currentStep);
  }

  get options(): Option[] {
    return this._currentStep.options;
  }

  get nextStepId(): number {
    return this._currentStep.nextStep;
  }
}

export class Script {
  private _script: FullScript;
  private _currentStep: CurrentStep;

  constructor (name: string) {
    this._script = this._parseScript(name);
    this._checkScript();
    this._currentStep = new CurrentStep(this._script.steps[this._script.beginStep]);
  }

  public setStep(step: number): void {
    this._currentStep = new CurrentStep(this._script.steps[step]);
  }

  get name(): string {
    return this._script.name;
  }

  get description(): string {
    return this._script.description;
  }

  get currentStep(): CurrentStep {
    return this._currentStep;
  }

  get steps(): Step[] {
    return this._script.steps;
  }

  get winIds(): number[] {
    return this._script.win_ids;
  }

  get lossIds(): number[] {
    return this._script.loss_ids;
  }

  private _parseScript(scriptName: string): FullScript {
    return JSON.parse(readFileSync(scriptName, "utf8"));
  }

  private _hasProperties(obj: object, properties: string[]): boolean {
    return properties.every(prop => prop in obj);
  }

  private _checkTopProperties(): boolean {
    return this._hasProperties(this._script, ["name", "description", "win_ids", "loss_ids", "steps", "beginStep"]);
  }

  private _reorganizeSteps(): void {
    let newSteps = this._script.steps;
    const beginStep = this._script.beginStep;
  }

  private _checkStepsGraph(): boolean {
    const steps: Step[] = this._script.steps;

    this._reorganizeSteps();
    return steps[0].id == 0 &&
           steps.every(step => {
           })
  }

  private _checkSteps(): boolean {
    const steps: Step[] = this._script.steps;

    return steps.length >= STEPS_MINIMUM_NUMBER && 
           steps.every(step => {
             this._hasProperties(step, ["id", "text"]) &&
             isAnyStep(step);
           }) &&
           this._checkStepsGraph();
  }

  private _checkScript() {
    if (this._checkTopProperties() && this._checkSteps()) {

    } else {

    }
  }
}