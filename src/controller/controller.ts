
import { Model } from "../model/Model.js";
import { QuitState } from "../model/states/Quit.js";
import { RunningState } from "../model/states/Running.js";
import { LossState } from "../model/states/Loss.js";
import { VictoryState } from "../model/states/Victory.js";

/* Оъект описывает слой контроллера в модели MVC.
 ***********************************************************************/
export class Controller {
  private _model: Model;

  constructor () { }

  public init(model: Model) {
    this._model = model;
  }

  /* Вызывается командой execute для изменения состояния или шага в 
   *   текущем Рабочем состоянии.
   **************************************************************************/
  public onStep(step: number) {
    const script = this._model.getScript();

    if (this.isLossStep(step)) {
      this._model.transitionTo(new LossState());
    } else if (this.isWinStep(step)) {
      this._model.transitionTo(new VictoryState());
    } else if (this.inRunningState()) {
      /* Если мы здесь, то мы уже запустили игру и находимся в 
       *   Рабочем состоянии - нам просто нужно изменить шаг и отобразить
       *   это во view.
       */
      const options = this._model.getScript().currentStep.options;
      const nextStep = this._model.getScript().currentStep.nextStepId;
      if (
        (options && this._model.getScript().currentStep.options.some(option => option.nextStep === step)) 
        || (nextStep && nextStep === step)
      ) {
        this._model.transitionToNextStep(step);
      } else {
        /* ничего у нас не меняется - рендеринг отображает тот же самый текст */
        console.log("******\nERROR: invalid step number\n******");
      }
    } else {
      /* Если мы здесь, то мы ещё НЕ запустили игру и находимся в 
       *   Начальном состоянии - нам просто нужно сделать начальный шаг, 
       *   перейти в Рабочее состояние и отобразить это во view.
       */
      script.setStep(step);
      this._model.transitionTo(new RunningState());
    }
  }

  /* Вызывается командой execute при вводе пользователем команды quit
   **************************************************************************/
  public onQuit() {
    this._model.transitionTo(new QuitState());
  }

  /* Полезные приватные методы для проверки текущего состояния игры. 
   **************************************************************************/
  private inRunningState(): boolean {
    return this._model.getState() instanceof RunningState;
  }

  private isLossStep(step: number): boolean {
    return this._model.getScript().lossIds.includes(step);
  }

  private isWinStep(step: number): boolean {
    return this._model.getScript().winIds.includes(step);
  }
}
