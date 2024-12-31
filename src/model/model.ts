
import { View } from "../view/view.js";
import { BeginningState } from "./states/beginning.js";
import { RunningState } from "./states/running.js";
import { State } from "./states/state.js";

import { FullScript, 
          Step,
          Option,
          isOptionStep,
          isAnyStep
        } from "../types.js";
import { Script } from "../script.js";

export class Model {
  private _view: View;
  private _state: State;
  private _script: Script;

  constructor () { }

  public _transitionTo(newState: State) {
    this._state = newState;
    this._state.setModel(this);
    this._state.setView(this._view);
    this._state.handle();
  }

  public getState(): State {
    return this._state;
  }

  public _transitionToNextStep(step: number) {
    if (this._state instanceof RunningState) {
      this._script.setStep(step);
      this._state.handle();
    }
  }

  public getScript() {
    return this._script;
  }

  public init(view: View, script: Script) {
    this._script = script;
    this._view = view;
    this._transitionTo(new BeginningState());
  }
}
