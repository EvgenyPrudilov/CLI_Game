
import { Model } from "../model/model.js";
import { QuitState } from "../model/states/quit.js";
import { RunningState } from "../model/states/running.js";
import { LossState } from "../model/states/loss.js";
import { VictoryState } from "../model/states/victory.js";

export class Controller {
  private _model: Model;

  constructor () { }

  public init(model: Model) {
    this._model = model;
  }

  public onStep(step: number) {
    const script = this._model.getScript();

    if (this.isLossStep(step)) {
      this._model._transitionTo(new LossState());
    } else if (this.isWinStep(step)) {
      this._model._transitionTo(new VictoryState());
    } else if (this.inRunningState()) {
      this._model._transitionToNextStep(step);
    } else {
      script.setStep(step);
      this._model._transitionTo(new RunningState());
    }
  }

  public onQuit() {
    this._model._transitionTo(new QuitState());
  }

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
