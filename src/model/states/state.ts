
import { Model } from "../model.js";
import { View } from "../../view/view.js";

export abstract class State {
  protected _model: Model;
  public setModel(model: Model) {
    this._model = model;
  }

  protected _view: View;
  public setView(view: View) {
    this._view = view;
  }

  public stopGame() {
    this._view.setCycleStatus(false);
  }

  public updateView(text: string): void {
    this._view.setText(text);
  }
  
  abstract handle(): void;
}




