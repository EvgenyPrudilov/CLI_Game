
import { Model } from "../Model.js";
import { View } from "../../view/View.js";

/* Используется для хранения данных о текущем состоянии нашей модели.
 ***********************************************************************/
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
  
  /* Метод используется после изменения модели для изменения view.
   ***********************************************************************/
  abstract handle(): void;
}




