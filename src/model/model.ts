
import { Script } from "../script/Script.js";
import { View } from "../view/View.js";
import { BeginningState } from "./states/Beginning.js";
import { State } from "./states/State.js";

/* Оъект описывает слой данных в модели MVC.
 ***********************************************************************/
export class Model {
  private _view: View;
  private _state: State;
  private _script: Script;

  constructor () { }

  /* Производим инициализацию.
   * устанавливаем текущее состояние как начальное
   ***********************************************************************/
  public init(view: View, script: Script) {
    this._script = script;
    this._view = view;
    this.transitionTo(new BeginningState());
  }
  
  public getState(): State { return this._state; }
  public getScript() { return this._script; }

  /* Изменение состояния модели.
   ***********************************************************************/
  public transitionTo(newState: State) {
    this._state = newState;
    this._state.setModel(this);
    this._state.setView(this._view);
    this._state.handle();
  }

  /* Как transitionTo(), но здесь(в месте вызова) мы уверены, что текущим 
   * состоянием является и остаётся RunningState.
   ***********************************************************************/
  public transitionToNextStep(step: number) {
    this._script.setStep(step);
    this._state.handle();
  }
}
