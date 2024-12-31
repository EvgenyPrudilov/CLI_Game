import { State } from "./state.js";

export class BeginningState extends State {
  public handle(): void { 
    const script = this._model.getScript();

    this.updateView(
      `*** ${ script.name } ***\n\n` +
      `${ script.description }\n\n` + 
      `Do you wanna play? Type START to play or QUIT to quit.`
    );
    this._view.setCycleStatus(true);
  }
}