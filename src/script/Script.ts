
import { CurrentStep } from "./CurrentStep.js";
import { FullScript, Step, isAnyStep } from "./Types.js";
import { readFileSync } from "fs";

const STEPS_MINIMUM_NUMBER: number = 2;

/* Этот оъект будет использоваться повсеместно для доступа к
 *   данным скрипта: номерам шага, текстам, вариантам путей, ...
 ***********************************************************************/
export class Script {
  private _script: FullScript;
  private _currentStep: CurrentStep;

   /* Читаем файл со скриптом игры. 
    * Проверяем, что сам скрипт корректен. 
    * Инициализируем объект с данными текущего шага, который будет 
    *   использоваться повсеместно для получения данных от текущем шаге.
    **************************************************************************/
  constructor (name: string) {
    this._script = this._parseScript(name);
    this._checkScript();
    this._currentStep = new CurrentStep(this._script.steps[this._script.beginStep]);
  }

  /* Полезные публичные методы и свойства.
   **************************************************************************/
  public setStep(step: number): void { 
    this._currentStep = new CurrentStep(this._script.steps[step]);
  }

  get name(): string { return this._script.name; }
  get description(): string { return this._script.description; }
  get currentStep(): CurrentStep { return this._currentStep; }
  get beginStep(): number { return this._script.beginStep; }
  get steps(): Step[] { return this._script.steps; }
  get winIds(): number[] { return this._script.win_ids; }
  get lossIds(): number[] { return this._script.loss_ids; }

  /* Полезные приватные методы для проверки скрипта. 
   **************************************************************************/
  private _parseScript(scriptName: string): FullScript {
    return JSON.parse(readFileSync(scriptName, "utf8"));
  }

  private _hasProperties(obj: object, properties: string[]): boolean {
    return properties.every(prop => prop in obj);
  }

  private _checkTopProperties(): boolean {
    return this._hasProperties(this._script, ["name", "description", "win_ids", "loss_ids", "steps", "beginStep"]);
  }

  private _checkSteps(): boolean {
    const steps: Step[] = this._script.steps;

    return steps.length >= STEPS_MINIMUM_NUMBER && 
           steps.every(step => {
             this._hasProperties(step, ["id", "text"]) &&
             isAnyStep(step);
           })
  }

  private _checkScript() {
    this._checkTopProperties()
    this._checkSteps()
  }
}