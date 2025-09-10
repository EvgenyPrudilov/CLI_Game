
import { Controller } from "../controller/Controller.js";
import { StepCommand } from "../controller/commands/Step.js";
import { QuitCommand } from "../controller/commands/Quit.js"
import { ViewInput } from "./ViewInput.js";
import { Script } from "../script/Script.js";

/* Оъект описывает слой view в модели MVC.
 ***********************************************************************/
export class View {
  private _stepCommand: StepCommand;
  private _quitCommand: QuitCommand;
  private _input: ViewInput;
  private _text: string;
  private _isInCycle: boolean = true;
  private _script: Script;

  constructor () { }

  public init(controller: Controller, script: Script): void {
    this._stepCommand = new StepCommand(controller);
    this._quitCommand = new QuitCommand(controller);
    this._input = new ViewInput();
    this._script = script;
  }

  public setText(newText: string) {
    this._text = newText;
  }
  
  public setCycleStatus(isInCycle: boolean) {
    this._isInCycle = isInCycle;
  }

  private _renderView() { 
    console.log(this._text);
  }
  /* Ввод данных от пользование и обращение к контроллеру для обработке
   *   этого ввода.
   ***********************************************************************/
  private async _processInput() {
    const input: number | "quit" | "start" | "empty" = await this._input.readInput("> ");
    if (input === "quit") {
      this._quitCommand.execute();
    } else if (input === "start") {
      /* мы только начинаем игру, поэтому шаг равен beginStep
       ***********************************************************************/
      this._stepCommand.setStepNumber(this._script.beginStep).execute();
    } else if (input === "empty") {
      /* ничего не делаем */
    } else {
      /* мы уже начинали игру, поэтому шаг равен тому, что указал пользователь
       ***********************************************************************/
      this._stepCommand.setStepNumber(input).execute();
    }
  }

  /* Отвеает за отображение текущего состояния игры.
   ***********************************************************************/
  public async renderCycle() {
    this._renderView();
    try {
      while (this._isInCycle) {
        await this._processInput();
        this._renderView();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      this._input.closeInput();
    }
  }
}
