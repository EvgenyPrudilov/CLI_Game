
import { State } from "./State.js";

/* Используется для хранения данных о Начальном состоянии нашей модели.
 ***********************************************************************/
export class BeginningState extends State {

  /* Метод используется после изменения модели для изменения view.
   ***********************************************************************/
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